// const debug = require('debug');
// const error = debug('app:error');
// const log   = debug('app:log');

// set namespace to log via console.log, bind to console
// log.log = console.log.bind(console);

// set all output to go via console.info
// overrides all per-namespace log settings
// debug.log = console.info.bind(console);

module.exports = {
  // error,
  // log
  error: (err) => {
    console.error(err);
  },
  log: (info) => {
    console.info(info);
  }
};
