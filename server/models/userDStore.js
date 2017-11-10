// user.model.js

const gstore = require('gstore-node')();
const bcrypt = require('bcrypt-nodejs');

const { Schema } = gstore;

/**
 * Create the schema for the User Model
*/
const userSchema = new Schema({
  firstname: { type: 'string', required: true },
  lastname: { type: 'string', required: true },
  email: { type: 'string', validate: 'isEmail', required: true },
  password: { type: 'string', read: false, required: true },
  password2: { type: 'string', read: false, required: true },
  createdOn: { type: 'string', default: gstore.defaultValues.NOW, write: false, read: false },
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
  const _this = this;
  const password = this.password;

  if (!password) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    bcrypt.genSalt(5, function onSalt(err, salt) {
      if (err) {
        return reject(err);
      }

      bcrypt.hash(password, salt, null, function onHash(err, hash) {
        if (err) {
          // reject will *not* save the entity
          return reject(err);
        }

        _this.password = hash;

        // resolve to go to next middleware or save method
        return resolve();
      });
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
