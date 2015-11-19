 /*jslint node: true */
"use strict";

//configuration
var config = require('./dontsync.js');

var scribe = require('scribe-js')({
  rootPath: "./logs/"
});
var console = process.console;

//express
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

//scribe logger (used for logging everything)
app.use(scribe.express.logger());
app.use('/logs', scribe.webPanel());

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
