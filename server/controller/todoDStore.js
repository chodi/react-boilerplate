// Todo.constroller.js

// const gstore = require('gstore-node')();
const Todo = require('../models/todoDStore');


const getTodo = (req, res) => {
  const todoId = req.query.id;
  Todo.get(todoId)
    .then((entity) => {
      res.json(entity.plain());
    })
    .catch((err) => res.status(400).json(err));
};
/*
* Customize get USer from datastore
* that pass by userId and not by request params
*/
const getTodoDStore = (req, res) => {
  Todo.list()
    .then((entity) => {
      res.json(entity.entities);
    })
    .catch((err) => res.status(400).json(err));
};

const createTodo = (req, res) => {
  const entityData = Todo.sanitize(req.body);
  const todo = new Todo(entityData);
  todo.save()
    .then((entity) => {
      res.json(entity.plain());
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updateTodo = (req, res) => {
  const todoId = +req.params.todoId;
  const entityData = Todo.sanitize(req.body); // { email: 'john@snow.com' }

  /**
   * This will fetch the entity, merge the data and save it back to the Datastore
  */
  Todo.update(todoId, entityData)
    .then((entity) => {
      res.json(entity.plain());
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteTodo = (req, res) => {
  const todoId = +req.params.todoId;
  Todo.delete(todoId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,

  getTodoDStore,
};
