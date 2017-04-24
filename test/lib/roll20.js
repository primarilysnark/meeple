const test = require('ava');
const td = require('testdouble');

const api = td.replace('../../lib/helpers/api');
const roll20 = require('../../lib/helpers/roll20');

test('#getToken returns null for no matching token', (t) => {
  td.when(api.findObjs({
    _type: 'graphic',
    _subtype: 'token',
    name: 'bad-token',
  })).thenReturn([]);

  t.is(roll20.getToken('bad-token'), null);
});

test('#getToken throws if token is ambiguous', (t) => {
  td.when(api.findObjs({
    _type: 'graphic',
    _subtype: 'token',
    name: 'ambiguous-token',
  })).thenReturn([{}, {}]);

  const error = t.throws(() => roll20.getToken('ambiguous-token'), Error);
  t.is(error.message, 'Too many matching tokens found.');
});

test('#getToken returns the token if matching token found', (t) => {
  td.when(api.findObjs({
    _type: 'graphic',
    _subtype: 'token',
    name: 'good-token',
  })).thenReturn([{
    id: 'good-test-id',
  }]);

  const token = roll20.getToken('good-token');
  t.is(token.id, 'good-test-id');
});

test('#getToken returns the token with extra options specified', (t) => {
  td.when(api.findObjs({
    _type: 'graphic',
    _subtype: 'token',
    name: 'good-token',
    testOption: 'test',
  })).thenReturn([{
    id: 'good-test-id',
  }]);

  const token = roll20.getToken('good-token', {
    testOption: 'test',
  });

  t.is(token.id, 'good-test-id');
});
