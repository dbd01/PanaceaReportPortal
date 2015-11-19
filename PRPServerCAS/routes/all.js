/*jslint node: true */
"use strict";

var console = process.console;
var fs = require("fs");
var path = require("path");
var config = require('../utilities/config');

var routing = function(app) {
  var routers = {};
  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf(".") !== 0) && (file !== "all.js");
    })
    .forEach(function(file) {
      var temp = require('./' + file.substring(0, file.length - 3));
      routers[file.substring(0, file.length - 3)] = temp.router;
      app.use(temp.path, routers[file.substring(0, file.length - 3)]);
    });
};

module.exports = routing;