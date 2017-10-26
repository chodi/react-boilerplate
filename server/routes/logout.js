const express = require('express');
const router = express.Router();

// Lougout Page
router.get('/', (req, res) => {
  req.logout();
  res.cookie('userToken', '', { expires: 0 });
  res.clearCookie();
  res.redirect('/login');
});

router.post('/', (req, res) => {
  req.logout();
  res.cookie('userToken', '', { expires: 0 });
  res.clearCookie();
  res.redirect('/login');
});

module.exports = router;
