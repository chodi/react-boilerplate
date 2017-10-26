const express = require('express');
const router = express.Router();

// Success Page
router.get('/success_page', (req, res) => {
  res.render('success_page');
});

module.exports = router;
