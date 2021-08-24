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
        _id, name, img, gitUrl, sinopse,
      }) => {
        return {
          id: _id,
          name,
          img,
          gitUrl,
          sinopse,
        };
      });
    });
};

const create = async (name, img, gitUrl, sinopse) => await connection().then((db) => db
  .collection('front-end')
  .insertOne({
    name, img, gitUrl, sinopse,
  })).catch((err) => (err));

const uploadImage = async (file) => await connection().then((db) => db
  .collection('images')
  .insertOne({ file })).catch((err) => (err));

module.exports = {
  getAll,
  create,
  uploadImage,
  connTest,
};
