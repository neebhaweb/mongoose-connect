const getModel = require('./get-model');

module.exports = function (args) {
  return { getModel: getModel(args) };
};
