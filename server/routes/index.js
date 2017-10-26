const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const url = require('url');
// const cookieParser = require('cookie-parser')

// Home Page
router.get('/', (req, res) => {
  if (req.cookies.userToken) {
    res.redirect('/home');
  } else {
    res.render('login');
  }
});


// Sign up Page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;

