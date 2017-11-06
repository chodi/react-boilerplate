const express = require('express');
const router = express.Router();

// Home Page
router.get('/', (req, res) => {
  if (req.cookies.userToken) {
    const user = req.cookies.user;
    res.render('mainRoute', { user });
  } else {
    res.redirect('/login');
  }
});

// Sign up Page
router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;

