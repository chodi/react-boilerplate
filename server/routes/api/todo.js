const express = require('express');
const router = express.Router();
const todoDStoreController = require('../../controller/todoDStore');

/* POST CREATE todo page. */
router.post('/', (req, res) => {
  todoDStoreController.createTodo(req, res);
});


/* GET todo page. */
router.get('/', (req, res) => {
  const owner = req.cookies.user.name;
  todoDStoreController.getTodoDStore({ owner }, req, res);
});

/* PUT todo page. */
router.put('/:todoId', (req, res) => {
  todoDStoreController.updateTodo(req, res);
});


module.exports = router;
