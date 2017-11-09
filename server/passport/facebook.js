/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('mongoose').model('User');
const config = require('../../SECRET');


/**
 * Sign in with Facebook.
 */
module.exports = new FacebookStrategy({
  clientID: config.auth.facebook.id,
  clientSecret: config.auth.facebook.secret,
  callbackURL: '/login/facebook/return',
  profileFields: [
    'displayName',
    'name',
    'email',
    'link',
    'locale',
    'timezone',
  ],
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  console.log('facebook profile', profile);
  User.findOne({ 'facebook.id': profile.id }, (err, user) => {
    if (user) {
      // There is already a Facebook account that belongs to you.
      // Sign in with that account or delete it, then link it with your current account.
      done(null, user);
    } else {
      User.create({
        facebook: {
          id: profile.id,
        },
        email: profile._json.email, // eslint-disable-line no-underscore-dangle
        name: profile.displayName,
      }, (e, u) => {
        done(null, u);
      });
    }
  });
});
