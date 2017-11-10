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

/* GET todo page. */
router.put('/', (req, res) => {
  const owner = req.cookies.user.name;
  todoDStoreController.getTodoDStore({ owner }, req, res);
});


module.exports = router;
