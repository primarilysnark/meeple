module.exports = {
  distanceToPixels: function () {
    return distanceToPixels(arguments);
  },
  findObjs: function () {
    return findObjs(arguments);
  },
  getTokenProperty: function (token, property) {
    return token.get(property);
  },
  setTokenProperties: function (token, properties) {
    return token.set(properties);
  }
};
