const isDev = process.env.NODE_ENV !== 'production';
const DBCRED = isDev ? require('../../SECRET') : '';
const DBuser = DBCRED ? DBCRED.DBCredUser : '';
const DBpass = DBCRED ? DBCRED.DBCredPass : '';

const DB_USER = DBuser || process.env.DB_USER;
const DB_PASSWORD = DBpass || process.env.DB_PASSWORD;

module.exports.connect = (mongoose) => {
  mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@ds227555.mlab.com:27555/react-login-test`, { useMongoClient: true });
  // plug in the promise library:
  // mongoose.Promise = Promise;


  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
    process.exit(1);
  });

  // load models
  require('./user');
};
