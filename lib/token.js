/* eslint-disable no-underscore-dangle */
const api = require('./helpers/api');
const roll20 = require('./helpers/roll20');

class Token {
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

module.exports = Token;
