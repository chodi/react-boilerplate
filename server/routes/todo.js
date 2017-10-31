const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


/* GET home page. */
router.get('/', function(req, res, next) {
  const userId = req.cookies.user
  fetch(`http://localhost:3000/api/v1/Todo?query={"owner":"${userId}"}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  .then((todosResult) => {
    return todosResult.json();
  })
  .then((todos) => {
    res.render('list', { todos, userId });
  })
  .catch((errrr) => res.send(errrr));
});


/* GET LIST task page. */
router.get('/list', (req, res, next) => {
  const userId = req.cookies.user
  fetch(`http://localhost:3000/api/v1/Todo?query={"owner":"${userId}"}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  .then((todosResult) => {
    return todosResult.json();
  })
  .then((todos) => {
    res.render('list', { todos, userId });
  })
  .catch((errrr) => res.send(errrr));
});

/* POST CREATE todo page. */
router.post('/create-todo/:userId', function(req, res, next) {
  const params = req.body;
  params.owner = req.cookies.user;
  fetch('http://localhost:3000/api/v1/Todo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }
  )
  .then(() => {
    res.redirect('/todo/list');
  })
  .catch((err) => res.send(err))
});

/* REQUEST Completed Task. */
router.get('/completed-todo/:ownerId/:todoId', function(req, res, next) {
  const params = { isCompleted: true };
  fetch(`http://localhost:3000/api/v1/Todo/${req.params.todoId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }
  )
  .then(() => {
    res.redirect('/todo/list');
  });
});

/* REVERT to NOt-COMPLETED Completed Task. */
router.get('/not-completed-todo/:ownerId/:todoId', function(req, res, next) {
  const params = { isCompleted: false };
  fetch(`http://localhost:3000/api/v1/Todo/${req.params.todoId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }
  )
  .then(() => {
    res.redirect('/todo/list');
  });
});

/* GET user update page. */
router.get('/update-todo/:todoId', function(req, res, next) {
  fetch(`http://localhost:3000/api/v1/Todo/${req.params.todoId}`,
    {
      method: 'GET',
    }
  )
  .then((updatedTodoResult) => {
    return updatedTodoResult.json();
  })
  .then((updatedTodoResultJson) => {
    res.render('todo', { todo: updatedTodoResultJson });
  });
});

/* POST REQUEST todo update page. */
router.post('/update-todo/:todoOwner/:todoId', function(req, res, next) {
  const params = req.body;
  fetch(`http://localhost:3000/api/v1/Todo/${req.params.todoId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }
  )
  .then(() => {
    res.redirect('/todo/list');
  });
});

module.exports = router;
