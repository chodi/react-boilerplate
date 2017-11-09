const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const UserDStore = require('../models/userDStore');
const UserController = require('../controller/userDStore');


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
    firstname: req.body.firstname.trim(),
    lastname: req.body.lastname.trim(),
    password2: req.body.password2.trim(),
  };

  // const newUser = new User(userData);
  const entityData = UserDStore.sanitize(userData);
  const newUser = new UserDStore(entityData);
  newUser.save()
  .then((entity) => {
    return done(null);
  })
  .catch((err) => {
    // If there are any validation error on the schema
    // they will be in this error object
    return done(err);
  });
  // newUser.save((err) => {
  //   if (err) { return done(err); }
  //   return done(null);
  // });
});
