var config = require('../dontsync.js')[process.env.NODE_ENV || 'development'];

var cors = function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", config.validDomains); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
};

module.exports = cors;
