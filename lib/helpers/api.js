/* globals Campaign, findObjs, getObj */
const DISTANCE_UNIT = 70;

export default class Api {
  static distanceToPixels(distance) {
    const page = getObj('page', Campaign().get('playerpageid'));

    return DISTANCE_UNIT * (distance / page.get('scale_number'));
  }

  static findObjs(options) {
    return findObjs(options);
  }

  static getTokenProperty(token, property) {
    return token.get(property);
  }

  static setTokenProperties(token, properties) {
    return token.set(properties);
  }
}
