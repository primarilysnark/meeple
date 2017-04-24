const DISTANCE_UNIT = 70;

module.exports = {
  distanceToPixels(distance) {
    const page = getObj('page', Campaign().get('playerpageid'));

    return DISTANCE_UNIT * (distance / page.get('scale_number'));
  },
  findObjs(options) {
    return findObjs(options);
  },
  getTokenProperty(token, property) {
    return token.get(property);
  },
  setTokenProperties(token, properties) {
    return token.set(properties);
  },
};
