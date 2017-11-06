const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

/*
* Please Edit the value Of domain if NEEDED
*
*/
const domain = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://react-boilerplate-login.herokuapp.com';

console.warn(" \n***************************************************** \n IF YOU ARE RUNNING THE PROD SCRIPT BUT USING LOCALHOST \n PLEASE SET THE DOMAIN VALUE in:\n", __dirname, "/login\n *****************************************************")
// Login Page
router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
// create a string for an HTTP body message
  const email = encodeURIComponent(req.body.email);
  const password = encodeURIComponent(req.body.password);
  const formData = `email=${email}&password=${password}`;
  fetch(`${domain}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  })
  .then((_res) => _res.json())
  .then((json) => {
    if (json.status === 200 && json.token) {
      res.cookie('userToken', json.token, { maxAge: 90000000, httpOnly: true });
      res.cookie('user', json.user.name, { maxAge: 90000000, httpOnly: true });
      const user = { name: json.user.name, email: json.user.email, username: json.user.email };
      res.cookie('user', user, { maxAge: 90000000, httpOnly: true });
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  });
});

module.exports = router;
