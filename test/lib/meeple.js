/* eslint-disable no-underscore-dangle */
import test from 'ava';
import td from 'testdouble';

import Meeple from '../../lib/meeple';
import roll20 from '../../lib/helpers/roll20';

const getToken = td.replace(roll20, 'getToken');

test('#constructor should create a new Meeple', (t) => {
  td.when(getToken('good-meeple-name', { testOptions: true })).thenReturn({
    _id: 'test-meeple-id',
  });

  const meeple = new Meeple('good-meeple-name', () => {}, { testOptions: true });
  t.is(meeple.internalToken._id, 'test-meeple-id');
});

test('#act should initialize a meeple\'s behavior', (t) => {
  const behavior = td.function();

  td.when(getToken('meeple-name', undefined)).thenReturn({
    _id: 'test-meeple-id',
  });

  const meeple = new Meeple('meeple-name', behavior);
  meeple.act('test-stage');

  td.verify(behavior('test-stage'));

  t.pass();
});
