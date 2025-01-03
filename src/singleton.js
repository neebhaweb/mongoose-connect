var instance;

module.exports = (args) => {
  if (instance) return instance;

  instance = args;
  return instance;
};
