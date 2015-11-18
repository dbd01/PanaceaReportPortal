 /* any requests that have to be rendered, shoulb be routed here */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {
    title: 'PRP Server CAS',
    environment: process.env.NODE_ENV || "development"
  });
});

//module.exports = router;
module.exports = {
  router : router,
  path : '/'
};
