/* eslint-disable no-underscore-dangle */
import roll20 from './helpers/roll20';
import api from './helpers/api';

export default class Token {
  constructor(name, options) {
    const token = roll20.getToken(name, options);

    if (token == null) {
      throw new Error('Token must exist.');
    }

    this.internalToken = token;
  }

  getId() {
    return this.internalToken._id;
  }

  place(left, top) {
    api.setTokenProperties(this.internalToken, {
      left: api.distanceToPixels(left),
      top: api.distanceToPixels(top),
    });
  }

  move(right, down) {
    api.setTokenProperties(this.internalToken, {
      left: api.getTokenProperty(this.internalToken, 'left') + api.distanceToPixels(right),
      top: api.getTokenProperty(this.internalToken, 'top') + api.distanceToPixels(down),
    });
  }
}
