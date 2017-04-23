var api = require('./api');

module.exports = {
  getToken: function (name, options) {
    const tokens = api.findObjs(Object.assign({}, {
      _type: 'graphic',
      _subtype: 'token',
      name
    }, options));

    if (tokens.length === 0) {
      return null;
    }

    if (tokens.length !== 1) {
      throw new Error('Too many matching tokens found.');
    }

    return tokens[0];
  }
};
