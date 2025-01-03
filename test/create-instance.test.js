const test = require('ava');
const mongoose = require('mongoose');
const _ = require('lodash');
const url1 = 'mongodb://localhost:27017/multi-db1';
const url2 = 'mongodb://localhost:27017/multi-db2';

const schemas = {
  'post': new mongoose.Schema({ some: String })
};

const multiConnect = require('../src');
const db1 = multiConnect.createInstance({ url: url1, mongoose, schemas });
const db2 = multiConnect.createInstance({ url: url2, mongoose, schemas });

test('should use different databases', async(t) => {
  const { id } = await db1.getModel('post').create({ some: Date.now() });
  const postFromDB1 = await db1.getModel('post').findById(id);

  t.is(postFromDB1.id, id);

  const result = await db2.getModel('post').findById(id);
  t.falsy(result);
});
