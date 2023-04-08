// https://github.com/NodeRedis/node_redis#readme
const redis = require('redis');
const { promisify } = require('util');

const REDIS_HOST = process.env.REDIS_HOST || 'localhost:6379';

const client = redis.createClient('redis://' + REDIS_HOST);

module.exports = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client)
};
