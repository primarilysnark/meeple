/* eslint-disable no-underscore-dangle */
import test from 'ava';
import td from 'testdouble';

import Token from '../../lib/token';
import api from '../../lib/helpers/api';
import roll20 from '../../lib/helpers/roll20';

const distanceToPixels = td.replace(api, 'distanceToPixels');
const getToken = td.replace(roll20, 'getToken');
const getTokenProperty = td.replace(api, 'getTokenProperty');
const setTokenProperties = td.replace(api, 'setTokenProperties');

let testToken;
test.beforeEach(() => {
  td.when(getToken('test-token-name', { testOptions: true })).thenReturn({
    _id: 'test-token-id',
  });

  testToken = new Token('test-token-name', { testOptions: true });
});

test('#constructor should create a new Token', (t) => {
  td.when(getToken('good-token-name', { testOptions: true })).thenReturn({
    _id: 'test-token-id',
  });

  const token = new Token('good-token-name', { testOptions: true });
  t.is(token.internalToken._id, 'test-token-id');
});

test('#constructor should throw if token is missing', (t) => {
  td.when(getToken('missing-token-name', { testOptions: true })).thenReturn(null);

  const error = t.throws(() => new Token('missing-token-name', { testOptions: true }), Error);

  t.is(error.message, 'Token must exist.');
});

test('#getId should return the token\'s id', (t) => {
  t.is(testToken.getId(), 'test-token-id');
});

test('#move should move the id by the provided coordinates', (t) => {
  td.when(getTokenProperty(testToken.internalToken, 'left')).thenReturn(0);
  td.when(getTokenProperty(testToken.internalToken, 'top')).thenReturn(2);
  td.when(distanceToPixels(5)).thenReturn(5);

  testToken.move(5, 5);

  td.verify(setTokenProperties(testToken.internalToken, {
    left: 5,
    top: 7,
  }));

  t.pass();
});

test('#place should move the id to the provided coordinates', (t) => {
  td.when(distanceToPixels(5)).thenReturn(5);

  testToken.place(5, 5);

  td.verify(setTokenProperties(testToken.internalToken, {
    left: 5,
    top: 5,
  }));

  t.pass();
});
