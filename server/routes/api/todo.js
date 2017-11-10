const express = require('express');
const router = express.Router();
const todoDStoreController = require('../../controller/todoDStore');

/* POST todo api. */
router.post('/', (req, res) => {
  todoDStoreController.createTodo(req, res);
});

/* GET todo api. */
router.get('/', (req, res) => {
  const todoId = req.query.id === 'undefined';
  if (todoId) {
    // List ALL todos
    todoDStoreController.getTodoDStore(req, res);
  } else {
    // For Specific ToDo ID
    todoDStoreController.getTodo(req, res);
  }
});

/* PUT todo api. */
router.put('/:todoId', (req, res) => {
  todoDStoreController.updateTodo(req, res);
});

/* DELETE todo api. */
router.delete('/:todoId', (req, res) => {
  todoDStoreController.deleteTodo(req, res);
});


module.exports = router;
