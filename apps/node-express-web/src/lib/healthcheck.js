const assert   = require('assert');
const mongoose = require('mongoose');
const waitOn   = require('wait-on');

const cache          = require('./cache');
const { error, log } = require('./log');

const MONGO_HOST = process.env.MONGO_HOST || 'localhost:27017';
// const REDIS_HOST = process.env.REDIS_HOST || 'localhost:6379';

/**
 * Application Health Check
 * Wait for dependencies (databases, services, hosts, etc.) to become available.
 * @param {} waitOnOpts Options for 'wait-on'
 */
async function healthcheck(waitOnOpts = undefined) {
  const defaultOpts = {
    resources: [],
    delay: 1000, // initial delay in ms, default 0
    interval: 2000, // poll interval in ms, default 250ms
    timeout: 30000, // timeout in ms, default Infinity
    tcpTimeout: 500, // tcp timeout in ms, default 300ms
    window: 1000, // stabilization time in ms, default 750ms
    strictSSL: false,
    followAllRedirects: true,
    followRedirect: true,
  };
  // if (REDIS_HOST !== undefined) {
  //   defaultOpts.resources.push(`redis://${REDIS_HOST}`);
  // }
  if (MONGO_HOST !== undefined) {
    defaultOpts.resources.push(`tcp:${MONGO_HOST}`);
  }

  return waitOn(waitOnOpts || defaultOpts)
    .then(() => log('Hosts active and listening.'))
    .then(async () => {
      // Test cache connections before starting the app.
      await cache.setAsync('cacheConnectTest', 'works', 'EX', 10);
      const cacheConnectTest = await cache.getAsync('cacheConnectTest');
      assert(cacheConnectTest === 'works', 'Cache connection test failed.');
    })
    .then(() => log('Cache connected.'))
    .then(async () => {
      // Test database connections before starting the app.
      return mongoose.connect(`mongodb://${MONGO_HOST}/test`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    })
    .then(() => log('Database connected.'))
    .then(() => log('Healthcheck passed.'));
}

module.exports = healthcheck;
