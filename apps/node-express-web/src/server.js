// -----------------------------------------------------------------------------
// Environment variables
// -----------------------------------------------------------------------------

const vars = require('./lib/vars');

// -----------------------------------------------------------------------------
// New Relic support
// -----------------------------------------------------------------------------

let newrelic;
if (vars.envPublic) {
  vars.env.NEW_RELIC_APP_NAME = vars.APP_TAG;
  newrelic = undefined; // newrelic = require('newrelic');
}

// -----------------------------------------------------------------------------
// External imports
// -----------------------------------------------------------------------------

const bodyParser   = require('body-parser');
const compression  = require('compression');
const cookieParser = require('cookie-parser');
const express      = require('express');
const RateLimit    = require('express-rate-limit');
const helmet       = require('helmet');
const morgan       = require('morgan');
const path         = require('path');
// const rfs          = require('rotating-file-stream')

// -----------------------------------------------------------------------------
// Internal imports
// -----------------------------------------------------------------------------

const cache          = require('./lib/cache');
const healthcheck    = require('./lib/healthcheck');
const jsonApi        = require('./lib/json-api');
const { error, log } = require('./lib/log');
const setHeaders     = require('./lib/set-headers');

// -----------------------------------------------------------------------------
// VARS
// -----------------------------------------------------------------------------

const STATIC_PATH = vars.env.STATIC_PATH || path.join(__dirname || process.cwd(), 'public');

const headers = {
  'X-Powered-By': `${vars.APP_TAG}`,
  'ETag': null
};

// -----------------------------------------------------------------------------
// Express application configuration.
// -----------------------------------------------------------------------------

const app = express();

// Express variables
app.locals.env     = vars.ENV;
app.locals.name    = vars.APP_NAME;
app.locals.version = vars.APP_VERSION;
app.locals.key     = vars.APP_KEY;
app.locals.tag     = vars.APP_TAG;

// Logging, with rotating write stream
app.use(morgan('combined'));
// const accessLogStream = rfs('access.log', {
//   interval: '1d',
//   path: path.join(__dirname, 'logs')
// });
// app.use(morgan('combined', { stream: accessLogStream }));

// Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cross Origin middleware
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Cookies
app.use(cookieParser());

// Compression
app.use(compression());

// Catch errors
app.use((err, req, res, next) => {
  // Log error to stderr
  error('Caught exception: ' + JSON.stringify(err));
  error(JSON.stringify({ stackTrace: err.stack || null }));
  // Error response (jsonapi.org spec)
  return jsonApi.errorResponse(res, err);
});

// Catch exceptions
process.on('uncaughtException', (err, req, res, next) => {
  error('Un/caught exception: ' + JSON.stringify(err));
  // Error response (jsonapi.org spec)
  return jsonApi.errorResponse(res, err);
});

// Helmet init: https://helmetjs.github.io/docs/
app.use(helmet());
// Only send the Referer header for pages on the same origin.
// Sets "Referrer-Policy: origin".
app.use(helmet.referrerPolicy({ policy: 'origin' }));
// Helmet's noCache is a relatively simple middleware that will set the four HTTP headers:
//   Cache-Control, Surrogate-Control, Pragma, and Expires.
// app.use(helmet.noCache());
// Secret key
app.set('secretKey', process.env.SECRET_KEY || 'aApmIWNvm6opCcMNrdZwFQfLFn32lyCG');
// only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
app.enable('trust proxy');

// Rate-limiting
const limiter = new RateLimit({
  // @see https://www.npmjs.com/package/express-rate-limit#configuration
  windowMs: 2 * 60 * 1000, // milliseconds to keep records of requests in memory. Default is 1 minute.
  max: 30, // limit each IP to n requests per windowMs before 429 response. Default is 5. Set to 0 to disable.
  delayMs: 0 // ms to delay response, (delayMs * (hits - delayAfter)). Default is 1 second. Set to 0 to disable.
});
// apply to all requests
app.use(limiter);

// -----------------------------------------------------------------------------
// App routes
// -----------------------------------------------------------------------------

// Health check
app.get('/health', async (req, res, next) => {
  healthcheck()
    .then(() => {
      return jsonApi.successResponse(res, true, 'App is healthy.', {
        app: {
          name: app.locals.name,
          version: app.locals.version,
          tag: app.locals.tag
        }
      });
    })
    .catch(next);
});

// Cache routes
app.get('/cache/:key', async function (req, res, next) {
  try {
    const { key } = req.params;
    const rawData = await cache.getAsync(key);
    return jsonApi.successResponse(res, JSON.parse(rawData), 'Data retrieved correctly.');
  } catch (err) {
    return jsonApi.errorResponse(res, { status: 404, message: 'Data not found.' });
  }
});

app.route('/cache')
  .get(function (req, res, next) {
    // Output a response; GET-query-controlled entity list, API docs, or error.
    return jsonApi.errorResponse(res, { status: 403, message: 'There is no data available at this endpoint.' });
  })
  .post(function (req, res, next) {
    // Process array of key-value pairs from POST-query, store in cache.
    try {
      Object.keys(req.query).forEach(async function(key) {
        await cache.setAsync(key, JSON.stringify(req.query[key]), 'EX', 600);
      });
      return jsonApi.successResponse(res, true, 'Input processed and stored correctly.');
    } catch (err) {
      return jsonApi.errorResponse(res, err);
    }
  });

// Home
app.get('/', (req, res) => {
  return res.send('Hello world');
});

// Server static files.
app.get('*.*', express.static(STATIC_PATH, {
  etag: false,
  maxAge: '1d',
  setHeaders: (res, uri_path) => setHeaders.cacheByMimeType
}));

// Run healthcheck before responding to traffic.
healthcheck()
  .then(() => {
    // Start Node/Express server listening on port.
    app.listen(vars.PORT, () => {
      log(`Application available at; ${vars.APP_URL}`);
    });
  })
  .catch((err) => {
    error(err);
    process.exit(1);
  });

// Node modules export an object which can easily be called elsewhere in the code.
// Our master app exports its app object.
module.exports = app;

// -----------------------------------------------------------------------------
// Functions
// -----------------------------------------------------------------------------
