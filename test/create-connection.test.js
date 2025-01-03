const test = require('ava');
const fn = require('../src/create-connection');

function getMongooseStub() {
  let connectionsCount = 0;
  return { createConnection: (url) => ++connectionsCount };
}

test.serial('create new connection', async(t) => {
  const mongoose = getMongooseStub();
  const url = 'mongodb://new';

  const connectionsCount = fn(mongoose, url);
  t.is(connectionsCount, 1);
});

test.serial('create one connection twice', async(t) => {
  const mongoose = getMongooseStub();
  const url = 'mongodb://new';

  fn(mongoose, url);
  const connectionsCount = fn(mongoose, url);
  t.is(connectionsCount, 1);
});

test.serial('create two different connections', async(t) => {
  const mongoose = getMongooseStub();
  const url1 = 'mongodb://one';
  const url2 = 'mongodb://two';

  fn(mongoose, url1);
  const connectionsCount = fn(mongoose, url2);
  t.is(connectionsCount, 2);
});

