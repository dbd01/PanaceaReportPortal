var console = process.console;

// json and xml final responce
var EasyXml = require('easyxml');
var serializer = new EasyXml({
  singularizeChildren: true,
  allowAttributes: true,
  rootElement: 'response',
  dateFormat: 'ISO',
  indent: 2,
  manifest: true
});
var jsonorxml = function (req, res, next) {
  if (res.payload) {
    res.status(res.payload.status);
    if (req.headers.accept && req.headers.accept.indexOf("application/json") > -1) {
      res.json({
        'result': res.payload.data
      });
    } else if (req.headers.accept && req.headers.accept.indexOf("application/xml") > -1) {
      res.set({
        'Content-Type': 'application/xml'
      });
      res.send(serializer.render((JSON.parse(JSON.stringify(res.payload.data)))));
    } else {
      res.status(406).send('Sorry! Replying only requests that accept json or xml answers.');
    }
  } else {
    next();
  }
};

module.exports = jsonorxml;
