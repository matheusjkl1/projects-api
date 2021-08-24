/* eslint-disable arrow-body-style */
require('dotenv').config();
const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { DB_URL } = process.env;

let db = null;

const connection = () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(DB_URL, OPTIONS).then((conn) => {
      db = conn.db('projects');
      return db;
    });
};

module.exports = connection;
