 /*jslint node: true */
"use strict";

//configuration
var config = require('./utilities/config');

// logging
var setLogLevel = require("dbd-loglevel");
var scribe = require('scribe-js')({
  rootPath: "./logs/"
});
var console = process.console;
setLogLevel(config.loglevel);

// In order to note settings for loading application
console.time().file().log('Loading on settings for NODE_ENV = ' + config.env);

//express
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//concepts for different things
require('./utilities/concepts.js');

var app = express();

//morgan logger (used only to see how long it takes to reply)
if (config.env != 'production') {
  var logger = require('morgan');
  app.use(logger('dev', {
    "stream": {
      write: function(str) {
        console.tag({
          msg: 'MORGAN',
          colors: ['cyan']
        }).time().log(str.substring(0, str.length - 1));
      }
    }
  }));
}

//scribe logger (used for logging everything)
app.use(scribe.express.logger());
app.use('/logs', scribe.webPanel());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// favicon
app.use(favicon(__dirname + '/public/favicon.ico'));


// generic middleware for express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// allowing CORS requests
var cors = require('./utilities/cors.js');
app.all('/*', cors);

//routing
var routing = require('./routes/all')(app);

// json and xml final responce
var jsonorxml = require('./utilities/formattingResponce.js');
app.use(jsonorxml);

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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
