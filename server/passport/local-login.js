const jwt = require('jsonwebtoken');
// const UserDStore = require('../models/userDStore');
const User = require('mongoose').model('User');

const isDev = process.env.NODE_ENV !== 'production';
const secret = isDev ? require('../../SECRET').secretkey : '';
const thisisacomplexkeyword = secret || process.env.COMPLEX_HASH_LETTERS;
const PassportLocalStrategy = require('passport-local').Strategy;


/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true,
  passReqToCallback: true,
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
  };
  // find a user by email address
  return User.findOne({ email: userData.email }, (err, user) => {
  // return UserDStore.findOne({ email: userData.email }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    // check if a hashed user's password is equal to a value saved in the database
    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (passwordErr) { return done(passwordErr); }

      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      const payload = {
        sub: user._id, // eslint-disable-line no-underscore-dangle
      };
      // create a token string
      const token = jwt.sign(payload, thisisacomplexkeyword);
      const data = {
        name: `${user.firstname} ${user.lastname}`,
        email: userData.email,
      };

      return done(null, token, data);
    });
  });
});
