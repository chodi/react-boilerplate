const PassportLocalStrategy = require('passport-local').Strategy;
const User = require('../models/userDStore');


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
    name: `${req.body.firstname.trim()} ${req.body.lastname.trim()}`,
    password2: req.body.password2.trim(),
  };
  const entityData = User.sanitize(userData);
  const newUser = new User(entityData);
  newUser.save()
    .then((entity) => done(null, entity.plain()))
    .catch((err) => done(err));
});
