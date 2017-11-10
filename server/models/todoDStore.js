// TODO.model.js

const gstore = require('gstore-node')();

const { Schema } = gstore;

/**
 * Create the schema for the User Model
*/
const todoSchema = new Schema({
  owner: { type: 'string', required: true },
  todo: { type: 'string', required: true },
  description: { type: 'string' },
  isCompleted: { type: 'boolean', default: false },
  createdOn: { type: 'string', default: gstore.defaultValues.NOW, write: false, read: false },
});

/**
 * List entities query shortcut
 */
const listSettings = {
  // limit: 15,
  order: { property: 'createdOn' },
};
todoSchema.queries('list', listSettings);


/**
 * Export the User Model
 * It will generate "User" entity kind in the Datastore
*/
module.exports = gstore.model('Todo', todoSchema);
