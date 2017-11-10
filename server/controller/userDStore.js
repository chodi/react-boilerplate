// user.constroller.js

// const gstore = require('gstore-node')();
const User = require('../models/userDStore');

const getUsers = (req, res) => {
  const pageCursor = req.query.cursor;

  User.list({ start: pageCursor })
    .then((entities) => {
      res.json(entities);
      // cb(entities.entities, null)
    })
    .catch((err) => res.status(400).json(err));
    // .catch((err) => cb(null, err));
};

const getUser = (req, res) => {
  const userId = +req.params.userId;
  User.get(userId)
    .then((entity) => {
      res.json(entity.plain());
      // cb(entity.plain());
    })
    .catch((err) => res.status(400).json(err));
    // .catch((err) => cb(null, err));
};
/*
* Customize get USer from datastore
* that pass by userId and not by request params
*/
const getUserDStore = (userId, req, res, cb) => {
  User.get(userId)
    .then((entity) => {
      // res.json(entity.plain());
      cb(entity.plain());
    })
    // .catch((err) => res.status(400).json(err));
    .catch((err) => cb(null, err));
};

const createUser = (req, res) => {
  const entityData = User.sanitize(req.body);
  const user = new User(entityData);

  user.save()
    .then((entity) => {
      res.json(entity.plain());
    })
    .catch((err) => {
      // If there are any validation error on the schema
      // they will be in this error object
      res.status(400).json(err);
    });
};

const updateUser = (req, res) => {
  const userId = +req.params.userId;
  const entityData = User.sanitize(req.body); // { email: 'john@snow.com' }

  /**
   * This will fetch the entity, merge the data and save it back to the Datastore
  */
  User.update(userId, entityData)
    .then((entity) => {
      res.json(entity.plain());
    })
    .catch((err) => {
      // If there are any validation error on the schema
      // they will be in this error object
      res.status(400).json(err);
    });
};

const deleteUser = (req, res) => {
  const userId = +req.params.userId;
  User.delete(userId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,

  getUserDStore,
};
