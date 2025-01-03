var get = require('lodash.get');

module.exports = (data, path) => {
  if (!path) return data;

  return get(data, path);
};
