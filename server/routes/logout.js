const express = require('express');
const router = express.Router();

// Lougout Page
router.get('/', (req, res) => {
  req.logout();
  res.clearCookie('userToken', { path: '/' });
  res.redirect('/login');
});

router.post('/', (req, res) => {
  req.logout();
  res.clearCookie('name', { path: '/' });
  res.redirect('/login');
});

module.exports = router;
