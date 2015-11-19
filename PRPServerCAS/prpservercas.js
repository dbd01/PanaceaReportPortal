var app = require('./app');
var config = require('./dontsync.js');
var console = process.console;

app.set('port', config.serverPort);

var server = app.listen(app.get('port'), function () {
  console.time().file().log('Express server listening on port ' + server.address().port);
});
