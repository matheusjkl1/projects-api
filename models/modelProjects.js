/* eslint-disable no-return-await */
/* eslint-disable arrow-body-style */
const connection = require('./connection');

const connTest = async () => {
  return await connection();
};

const getAll = async () => {
  return connection()
    .then((db) => db.collection('front-end').find().toArray())
    .then((items) => {
      return items.map(({
        _id, name, img, url, gitUrl, sinopse, stacks,
      }) => {
        return {
          id: _id,
          name,
          img,
          url,
          gitUrl,
          sinopse,
          stacks,
        };
      });
    });
};

const create = async (name, img, url, gitUrl, sinopse, stacks) => await connection().then((db) => db
  .collection('front-end')
  .insertOne({
    name, img, url, gitUrl, sinopse, stacks,
  })).catch((err) => (err));

module.exports = {
  getAll,
  create,
  connTest,
};
