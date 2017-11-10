// user.model.js

const gstore = require('gstore-node')();
const bcrypt = require('bcrypt-nodejs');

const { Schema } = gstore;

/**
 * Create the schema for the User Model
*/
const userSchema = new Schema({
  name: { type: 'string' },
  email: { type: 'string', validate: 'isEmail', required: true },
  password: { type: 'string', read: false },
  password2: { type: 'string', read: false },
  createdOn: { type: 'string', default: gstore.defaultValues.NOW, write: false, read: false },
  facebook: { type: 'object' },
  //   id: { type: 'string'},
  //   token: { type: 'string'},
  //   accessToken: { type: 'string'},
  //   refreshToken: { type: 'string'},
  // },
});

/**
 * List entities query shortcut
 */
const listSettings = {
  limit: 15,
  order: { property: 'lastname' },
};
userSchema.queries('list', listSettings);

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
userSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};
/**
 * Pre "save" middleware
 * Each time the entity is saved or updated, if there is a password passed, it will be hashed
*/
function hashPassword() {
    // scope *this* is the entity instance
  const self = this;
  const password = this.password;

  if (!password) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    bcrypt.genSalt(5, (err, salt) => {
      if (err) {
        return reject(err);
      }

      bcrypt.hash(password, salt, null, (hashErr, hash) => {
        if (hashErr) {
          // reject will *not* save the entity
          return reject(hashErr);
        }

        self.password = hash;

        // resolve to go to next middleware or save method
        return resolve();
      });
      return this;
    });
  });
}

// add the "pre" middleware to the save method
userSchema.pre('save', hashPassword);

/**
 * Export the User Model
 * It will generate "User" entity kind in the Datastore
*/
module.exports = gstore.model('User', userSchema);
