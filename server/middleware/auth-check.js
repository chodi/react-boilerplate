const jwt = require('jsonwebtoken');
// const User = require('mongoose').model('User');
const isDev = process.env.NODE_ENV !== 'production';
const secret = isDev ? require('../../SECRET').secretkey : '';
const thisisacomplexkeyword = isDev ? secret : process.env.COMPLEX_HASH_LETTERS;
const UserDStoreController = require('../controller/userDStore');
/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (req.url === '/logout'
    || req.url === '/favicon.ico'
    || req.url === '/signup'
    || req.url === '/auth/signup'
    || req.url === '/login'
    || (req.url === '/auth/login' && req.method === 'POST')
  ) {
    return next();
  }
  const tokenExists = req.headers.authorization || req.cookies.userToken;
  if (!tokenExists) {
    return res.render('login', { message: 'token not exist' });
  }
  const token = req.cookies.userToken || req.headers.authorization.split(' ')[1];
  // decode the token using a secret key-phrase

  return jwt.verify(token, thisisacomplexkeyword, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }
    const userId = decoded.sub;

    /*
    * check if a user exists
    *
    */
  //   return User.findById(userId, (userErr, user) => {
  //     if (userErr || !user) {
  //       return res.status(401).end();
  //     }
  //     return next();
  //   });
    return UserDStoreController.getUserDStore(userId, req, res, (user, userErr) => {
      if (userErr || !user) {
        return res.status(401).end();
      }
      return next();
    });
  });
};

