const test = require('ava');
const mongoose = require('mongoose');
const _ = require('lodash');
const url = 'mongodb://localhost:27017/multi-db';

const schemas = {
  'post': new mongoose.Schema({ some: String })
};

const multiConnect = require('../src');
multiConnect.init({ url, mongoose, schemas });

test('with postfix', async(t) => {
  const { id } = await multiConnect.getModel('post', 'any').create({ some: Date.now() });
  const postFromAny = await multiConnect.getModel('post', 'any').findById(id);

  t.is(postFromAny.id, id);

  await multiConnect.getModel('post', 'other').create({ some: Date.now() });
  const postFromOther = await multiConnect.getModel('post', 'other').findById(id);
  t.falsy(postFromOther);
});

test('without postfix', async(t) => {
  const { id } = await multiConnect.getModel('post').create({ some: Date.now() });
  const postFromAny = await multiConnect.getModel('post').findById(id);

  t.is(postFromAny.id, id);

  await multiConnect.getModel('post', 'other').create({ some: Date.now() });
  const postFromOther = await multiConnect.getModel('post', 'other').findById(id);
  t.falsy(postFromOther);
});
