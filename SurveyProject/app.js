var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');


var user_login = require('./routes/user_login');
var questions = require('./routes/questions');
var admin_login = require('./routes/admin_login');
var allpatients = require('./routes/allpatients');
var new_user = require('./routes/new_user');
var home = require('./routes/home');
var pr = require('./routes/patient_response');
var dashboard = require('./routes/dashboard');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

app.use(session({secret: 'test',
                         saveUninitialized : true,
                         resave : true}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/UserLogin', user_login);
app.use('/Questions', questions);
app.use('/AdminLogin', admin_login);
app.use('/allpatients', allpatients);
app.use('/patient_response', pr);
app.use('/new_user', new_user);
app.use('/home', home);
app.use('/dashboard', dashboard);


var msg = 'Welcome to our API';
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Magic happens on port' + port);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('pages/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('pages/error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
