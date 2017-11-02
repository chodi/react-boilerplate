const express = require('express');
const router = express.Router();

// Home Page
router.get('/', (req, res) => {
  if (req.cookies.userToken) {
    res.redirect('/home');
  } else {
    res.redirect('/login');
  }
});

// Sign up Page
router.get('/signup', (req, res) => {
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
  console.log('NODE.ENV', process.env.NODE_ENV)
  console.log('### IM HERE at RENDER signup')
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
  res.render('signup');
});

module.exports = router;

