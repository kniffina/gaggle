var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var session = require('express-session');
var passport = require('passport');
//var FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

const port = process.env.PORT || 8080;
const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || '27017';
const mongoDb = process.env.MONGO_DB || 'gaggle-api';
const mongoCredentials = (process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD) ? `${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@` : '';
const dbUrl = `mongodb://${mongoCredentials}${mongoHost}:${mongoPort}/${mongoDb}`;

mongoose.connect(dbUrl, function(err, res) {
	if (err) {
    console.log('MongoDB Connection Failed: '+err);
  } else {
    console.log('MongoDB Connection Success: '+dbUrl);
	}
});

var index = require('./routes/index');
var api = require('./routes/api');
var account = require('./routes/account');

var app = express();

// view engine setup
app.engine('mustache', require('hogan-middleware').__express)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'mustache')


app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public/images')));
app.use(express.static(path.join(__dirname, '/dist')));

app.use(passport.initialize());

//require('./config/passport')(passport); //i should modify passport.js so we can write app.use('./config/passport') for consistency but meh
                                        //if we want to protect any endpoints (make sure a user is logged in before returning response), add
                                        // authMiddleware() as argument eg app.use('/', authMiddleware(), index)

							
app.use('/', index);
app.use('/api', api);
app.use('/account', account);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
