const express = require('express');
const router = express.Router();
const passport = require('passport');
const secret = require('../../SECRET').secretkey;
const jwt = require('jsonwebtoken');

router.get('/webhook', (req, res) => {
  res.send(req.url.split('hub.mode=subscribe&hub.challenge=')[1].split('&')[0]);
});
router.post('/webhook', (req, res) => {
  console.log('facebook message', req.body.entry[0].messaging);
  res.sendStatus(200);
});

router.get('/hook', (req, res) => {
  res.send(req.url.split('hub.mode=subscribe&hub.challenge=')[1].split('&')[0]);
});

router.post('/hook', (req, res) => {
  console.log('facebook hook hook', req.body);
  res.sendStatus(200);
});

router.get('/login', passport.authenticate('facebook', { scope: ['email', 'user_location', 'read_page_mailboxes', 'manage_pages', 'pages_messaging', 'pages_messaging_subscriptions'], session: false }));

router.get('/auth/callback', passport.authenticate('facebook', {
  failureRedirect: '/login',
  session: false,
}), (req, res) => {
  const expiresIn = 60 * 60 * 24 * 180; // 180 days
  console.log('req.user', req.user);
  const payload = {
    sub: req.user.entityKey.id, // eslint-disable-line no-underscore-dangle
  };
  const token = jwt.sign(payload, secret, { expiresIn });
  console.log('facebook callback', token);
  res.cookie('userToken', token, { maxAge: 1000 * expiresIn, httpOnly: true });
  res.redirect('/');
  return null;
});


module.exports = router;
