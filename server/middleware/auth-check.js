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
  console.log('############################')
  console.log('### IM HERE at auth-check')
  console.log('### URL', req.url)
  console.log('############################')
  if (req.url === '/logout') {
    return next();
  }
  if (req.url === '/sw.js') {
    return next();
  }

  if (req.url === '/signup' || req.url === '/auth/signup' || (req.url === '/login' && (req.method === 'POST' || req.method === 'GET')) || (req.url === '/auth/login' && req.method === 'POST')) {
    return next();
  }
  const tokenExists = req.headers.authorization || req.cookies.userToken;
  console.log('############################')
  console.log('tokenExists', tokenExists)
  console.log('############################')
  if (!tokenExists) {
    console.log('############################')
    console.log('ID DONT HAVE TOKEN at url', req.url)
    console.log('############################')
    return res.render('login', { message: 'token not exist' });
  }
  const token = req.cookies.userToken || req.headers.authorization.split(' ')[1];
  // decode the token using a secret key-phrase

  console.log('############################')
  console.log('token ', tokenExists,'@ URL', req.url)
  console.log('############################')
  return jwt.verify(token, thisisacomplexkeyword, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }
    const userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }
      return next();
    });
  });
};

