var api = require('./helpers/api');
var roll20 = require('./helpers/roll20');

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
      top: api.distanceToPixels(top)
    });
  }

  move(left, top) {
    api.setTokenProperties(this.internalToken, {
      left: api.getTokenProperty(this.internalToken, 'left') + api.distanceToPixels(left),
      top: api.getTokenProperty(this.internalToken, 'top') + api.distanceToPixels(top)
    });
  }
}

module.exports = Token;
