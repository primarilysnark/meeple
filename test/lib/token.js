/* eslint-disable no-underscore-dangle */
const test = require('ava');
const td = require('testdouble');

const api = td.replace('../../lib/helpers/api');
const roll20 = td.replace('../../lib/helpers/roll20');
const Token = require('../../lib/token');

let testToken;
test.beforeEach(() => {
  td.when(roll20.getToken('test-token-name', { testOptions: true })).thenReturn({
    _id: 'test-token-id',
  });

  testToken = new Token('test-token-name', { testOptions: true });
});

test('#constructor should create a new Token', (t) => {
  td.when(roll20.getToken('good-token-name', { testOptions: true })).thenReturn({
    _id: 'test-token-id',
  });

  const token = new Token('good-token-name', { testOptions: true });
  t.is(token.internalToken._id, 'test-token-id');
});

test('#constructor should throw if token is missing', (t) => {
  td.when(roll20.getToken('missing-token-name', { testOptions: true })).thenReturn(null);

  const error = t.throws(() => new Token('missing-token-name', { testOptions: true }), Error);

  t.is(error.message, 'Token must exist.');
});

test('#getId should return the token\'s id', (t) => {
  t.is(testToken.getId(), 'test-token-id');
});

test('#move should move the id by the provided coordinates', (t) => {
  td.when(api.getTokenProperty(testToken.internalToken, 'left')).thenReturn(0);
  td.when(api.getTokenProperty(testToken.internalToken, 'top')).thenReturn(2);
  td.when(api.distanceToPixels(5)).thenReturn(5);

  testToken.move(5, 5);

  td.verify(api.setTokenProperties(testToken.internalToken, {
    left: 5,
    top: 7,
  }));

  t.pass();
});

test('#place should move the id to the provided coordinates', (t) => {
  td.when(api.distanceToPixels(5)).thenReturn(5);

  testToken.place(5, 5);

  td.verify(api.setTokenProperties(testToken.internalToken, {
    left: 5,
    top: 5,
  }));

  t.pass();
});
