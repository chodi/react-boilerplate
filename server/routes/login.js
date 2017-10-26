const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const url = require('url');

// Login Page
router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
// create a string for an HTTP body message
  const email = encodeURIComponent(req.body.email);
  const password = encodeURIComponent(req.body.password);
  const formData = `email=${email}&password=${password}`;
  fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  })
  .then((_res) => _res.json())
  .then((json) => {
    if (json.status === 200) {
      res.cookie('userToken', json.token, { maxAge: 900000, httpOnly: true });
      res.redirect(url.format({
        pathname: '/',
        query: { status: json.status },
      }));
    } else {
      res.redirect('/login');
    }
  });
});

module.exports = router;
