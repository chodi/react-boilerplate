// Todo.constroller.js

const gstore = require('gstore-node')();
const Todo = require('../models/todoDStore');

const getTodos = (req, res, cb) => {
  const pageCursor = req.query.cursor;
  Todo.list({ start: pageCursor })
    .then((entities) => {
      res.json(entities);
      // cb(entities.entities, null)
    })
    .catch((err) => res.status(400).json(err));
    // .catch((err) => cb(null, err));
};

// const getTodo = (req, res, cb) => {
//   const userId = +req.params.userId;
//   Todo.get(userId)
//     .then((entity) => {
//       res.json(entity.plain());
//       // cb(entity.plain());
//     })
//     .catch((err) => res.status(400).json(err));
//     // .catch((err) => cb(null, err));
// };
/*
* Customize get USer from datastore
* that pass by userId and not by request params
*/
const getTodoDStore = (ownerId, req, res, cb) => {
  Todo.list()
    .then((entity) => {
      res.json(entity.entities);
      // cb(entity.plain());
    })
    .catch((err) => res.status(400).json(err));
    // .catch((err) => cb(null, err));
};

const createTodo = (req, res, cb) => {
  const entityData = Todo.sanitize(req.body);
  const todo = new Todo(entityData);
  todo.save()
    .then((entity) => {
      res.json(entity.plain());
    })
    .catch((err) => {
      // If there are any validation error on the schema
      // they will be in this error object
      // cb(null, err);
      res.status(400).json(err);
    });
};

const updateTodo = (req, res, cb) => {
  const userId = +req.params.userId;
  const entityData = Todo.sanitize(req.body); // { email: 'john@snow.com' }

  /**
   * This will fetch the entity, merge the data and save it back to the Datastore
  */
  Todo.update(userId, entityData)
    .then((entity) => {
      res.json(entity.plain());
      // cb(entity.plain());
    })
    .catch((err) => {
      // If there are any validation error on the schema
      // they will be in this error object
      // cb(null, err);
      res.status(400).json(err);
    });
};

const deleteTodo = (req, res, cb) => {
  const userId = +req.params.userId;
  Todo.delete(userId)
    .then((response) => {
      res.json(response);
      // cb(response.mutationResults);
    })
    .catch((err) => res.status(400).json(err));
    // .catch((err) => cb(null, err));
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,

  getTodoDStore,
};
