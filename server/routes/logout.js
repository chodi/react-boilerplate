const express = require('express');
const router = express.Router();

// Lougout Page
router.get('/', (req, res) => {
  console.log("get res.cookie.userToken", res.cookie);
  res.clearCookie('userToken');
  console.log("get res.cookie.userToken", res.cookie);
  res.sendStatus(200).end();
});

router.post('/', (req, res) => {
  console.log("post res.cookie.userToken", res.cookie);
  res.clearCookie('userToken');
  console.log("post res.cookie.userToken", res.cookie);
  res.sendStatus(200).end();
});

module.exports = router;
