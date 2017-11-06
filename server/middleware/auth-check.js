const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
// const Auth = require('../modules/Auth');
const isDev = process.env.NODE_ENV !== 'production';
const secret = isDev ? require('../../SECRET').secretkey : '';
const thisisacomplexkeyword = isDev ? secret : process.env.COMPLEX_HASH_LETTERS;
/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  console.log("@@@@@@@@@@@@@@@@@@@@")
  console.log("URL", req.url)
  console.log("@@@@@@@@@@@@@@@@@@@@")
  console.log("\n")
  if (req.url === '/sw.js') {
    return next();
  }

  if (req.url === '/logout' || req.url === '/favicon.ico' || req.url === '/signup' || req.url === '/auth/signup' || (req.url === '/login' && (req.method === 'POST' || req.method === 'GET')) || (req.url === '/auth/login' && req.method === 'POST')) {
    return next();
  }
  const tokenExists = req.headers.authorization || req.cookies.userToken;
  if (req.url === '/' && tokenExists) {
    // return next();
  }
  if (!tokenExists) {
    console.log("############## IM DEAD", req.url)
    return res.render('login', { message: 'token not exist' });
  }
  console.log("#########################")
  console.log("IM PASSED 002", req.url)
  console.log("#########################")
  const token = req.cookies.userToken || req.headers.authorization.split(' ')[1];
  // decode the token using a secret key-phrase

  return jwt.verify(token, thisisacomplexkeyword, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }
    const userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }
      console.log("#########################")
      console.log("IM PASSED NEXXT", req.url)
      console.log("#########################")
      return next();
    });
  });
};

