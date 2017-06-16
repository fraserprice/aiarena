const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const cors = require('cors');
const mongoose = require('mongoose');
const mongo = require('mongodb');
const passport = require('passport');
const python = require('./routes/python');
const register = require('./routes/registration');
const login = require('./routes/login');
const toClient = require('./routes/toclient');
const profile = require('./routes/profile');
const user = require('./routes/user');
const friend = require('./routes/friend');
const submission = require('./routes/add_submission');
const submission_delete = require('./routes/delete_submission');
const submission_setmain = require('./routes/setmain_submission');
const code_download = require('./routes/code_download');
const code_upload = require('./routes/code_upload');

const authMiddleware = require('./auth/auth');

const app = express();
//const dbURL = 'mongodb://localhost:27017/aiarena';
const dbURL = 'mongodb://aiarena:mongo@ds019966.mlab.com:19966/heroku_ll75kc63'

mongoose.Promise = global.Promise;
mongoose.connect(dbURL, (err) => {console.log(err);});
require('./config/passport');

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true,
}));

//Routes
app.use('/', express.static(path.join(__dirname, '../client/')));
app.use('/res/', express.static(path.join(__dirname, './public/')));
app.use('/res/profile.jpeg', express.static(path.join(__dirname, './public/')));
app.use('/register', register);
app.use('/login', login);
app.use('/toclient', toClient);

app.use('/auth', authMiddleware);
app.use('/auth/friend', friend);
app.use('/auth/python', python);
app.use('/auth/get', code_download);
app.use('/auth/get', user);
app.use('/auth/get', profile);
app.use('/auth/add', code_upload);
app.use('/auth/add', submission);
app.use('/auth/del', submission_delete);
app.use('/auth/set', submission_setmain);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
