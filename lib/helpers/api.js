module.exports = {
  distanceToPixels(...params) {
    return global.distanceToPixels(params);
  },
  findObjs(...params) {
    return global.findObjs(params);
  },
  getTokenProperty(token, property) {
    return token.get(property);
  },
  setTokenProperties(token, properties) {
    return token.set(properties);
  },
};
