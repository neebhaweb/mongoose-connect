const test = require('ava');
const fn = require('../src/get-postfix');

test('with data, without path', async(t) => {
  const data = 'location1';
  const expected = data;

  const result = fn(data);
  t.is(result, expected);
});

test('with data and path', async(t) => {
  const data = { location: 'location1' };
  const path = 'location';
  const expected = data.location;

  const result = fn(data, path);
  t.is(result, expected);
});

test('without data', async(t) => {
  const expected = undefined;

  const result = fn();
  t.is(result, expected);
});

test('with wrong path', async(t) => {
  const data = { location: 'location1' };
  const path = 'state[0]';
  const expected = undefined;

  const result = fn(data, path);
  t.is(result, expected);
});
