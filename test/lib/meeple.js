var test = require('ava');
var td = require('testdouble');

var roll20 = td.replace('../../lib/helpers/roll20');
var Meeple = require('../../lib/meeple');

test('#constructor should create a new Meeple', t => {
  td.when(roll20.getToken('good-meeple-name', { testOptions: true })).thenReturn({
    _id: 'test-meeple-id'
  });

  const meeple = new Meeple('good-meeple-name', () => {}, { testOptions: true });
  t.is(meeple.internalToken._id, 'test-meeple-id');
});

test('#act should initialize a meeple\'s behavior', t => {
  const behavior = td.function();
  
  td.when(roll20.getToken('meeple-name', undefined)).thenReturn({
    _id: 'test-meeple-id'
  });

  const meeple = new Meeple('meeple-name', behavior);
  meeple.act('test-stage');

  td.verify(behavior('test-stage'));

  t.pass();
});
