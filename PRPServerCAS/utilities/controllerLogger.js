
var console = process.console;
var config = require('../dontsync.js')[process.env.NODE_ENV || 'development'];

function controllerLogger(controllerName) {
  return function (req, res, next) {
    console.tag({
      msg: 'CONTROLLER',
      colors: ['magenta']
    }).time().info(controllerName);
    next();
  };
}

module.exports = controllerLogger;
