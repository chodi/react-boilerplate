const PassportLocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');


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
  const newUser = new User(userData);
  newUser.save((err) => {
    if (err) { return done(err); }
    return done(null);
  });
});

