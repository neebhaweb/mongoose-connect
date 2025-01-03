# Mongoose multi connect

Establish multi connections with using DB name postfix. 

# Single instance

```js
const url = 'mongodb://localhost:27017/multi-db';
const mongoose = require('mongoose');
const multiConnect = require('mongoose-multi-connect');

const schemas = {
  'post': new mongoose.Schema({ some: String })
};

multiConnect.init({ url, mongoose, schemas });

// Model 'post' from 'mongodb://localhost:27017/multi-db-location1' 
const PostLocation1 = multiConnect.getModel('post', 'location1');

// Model 'post' from 'mongodb://localhost:27017/multi-db-location2' 
const PostLocation2 = multiConnect.getModel('post', 'location2');
```

# Many instances

```js
const mongoose = require('mongoose');
const multiConnect = require('mongoose-multi-connect');

const url1 = 'mongodb://localhost:27017/multi-db1';
const url2 = 'mongodb://localhost:27017/multi-db2';

const schemas = {
  'post': new mongoose.Schema({ some: String })
};

const db1 = multiConnect.createInstance({ url: url1, mongoose, schemas });
const db2 = multiConnect.createInstance({ url: url2, mongoose, schemas });

// Model 'post' from 'mongodb://localhost:27017/multi-db1-location1'
const PostLocation1 = db1.getModel('post', 'location1');

// Model 'post' from 'mongodb://localhost:27017/multi-db2-location2'
const PostLocation2 = db2.getModel('post', 'location2');
```