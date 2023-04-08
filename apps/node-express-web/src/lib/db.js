// const merge    = require('lodash/fp/object').merge;
// const mongoose = require('mongoose');
// const waitOn   = require('wait-on');

// const MONGO_HOST = process.env.MONGO_HOST || 'localhost:27017';
// const MONGO_URI = `mongodb://${MONGO_HOST}/test`;

// const defaultDbOpts = {
//   useNewUrlParser: true,
//   // useCreateIndex: true,
//   // useFindAndModify: false,
//   // autoIndex: false, // Don't build indexes
//   // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
//   // reconnectInterval: 500, // Reconnect every 500ms
//   // poolSize: 10, // Maintain up to 10 socket connections
//   // // If not connected, return errors immediately rather than waiting for reconnect
//   // bufferMaxEntries: 0,
//   // connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
//   // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//   // family: 4 // Use IPv4, skip trying IPv6
// };

// // Test database connection(s).
// // Wait for DB server to launch and start listening.
// // This will not block scripting process.
// // Connect to the database before starting the application server.
// const waitOnOpts = {
//   resources: [
//     `tcp:${MONGO_HOST}`
//   ],
//   delay: 1000, // initial delay in ms, default 0
//   interval: 3000, // poll interval in ms, default 250ms
//   timeout: 30000, // timeout in ms, default Infinity
//   tcpTimeout: 1000, // tcp timeout in ms, default 300ms
//   window: 1500, // stabilization time in ms, default 750ms
//   strictSSL: false,
//   followAllRedirects: true,
//   followRedirect: true,
// };

// async function db(dbHost = MONGO_HOST, dbOpts = defaultDbOpts) {
//   const opts = merge({}, dbOpts, defaultDbOpts);
//   // Replica set support
//   if (dbHost.includes(',')) {
//     defaultDbOpts.replicaSet = 'myRepl';
//   }
// }

// try {
//   await waitOn(waitOnOpts);
//   await mongoose.connect(MONGO_URI, mongooseOpts);
//   console.log('MongoDB Connected');
// } catch (error) {
//   console.log(err);
//   process.exit(1);
// }

// module.exports = {
//   ...mongoose,
// };
