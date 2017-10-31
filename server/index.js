const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const logger = require('./logger');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const restify = require('express-restify-mongoose');

// connect to the database and load models
require('./models').connect(mongoose);
// Overwrite the Promise method of mongoose
mongoose.Promise = Promise;
// Model for CRUD RESTIFY
const Todo = require('./models/todos')(mongoose);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth-check');

const cookieParser = require('cookie-parser');
const app = express();
// need cookieParser middleware before we can do anything with cookies
app.use(cookieParser());


// tell the app to parse HTTP body messages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Required for RESTIFY
const router = express.Router();
restify.serve(router, Todo, { preMiddleware: authCheckMiddleware });

// Express session
// app.use(session({ secret: 'secrets', resave: true, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());

// load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');

passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// View engine
app.engine('handlebars', exphbs(/*{ defaultLayout: 'main' }*/));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


// ********************************************************************
// IMPORTANT NOTE!!!
// Uncomment below this line to implement an auth before accessing any routes
// ********************************************************************
app.use('/', authCheckMiddleware);

// routes
const index = require('./routes');
const authRoutes = require('./routes/auth');
// const apiRoutes = require('./routes/api');
const login = require('./routes/login');
const logout = require('./routes/logout');
const todo = require('./routes/todo');

app.use('/auth', authRoutes(passport));
// app.use('/api', apiRoutes);
app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/todo', todo);
app.use(router);

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});
