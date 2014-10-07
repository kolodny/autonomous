var http = require('http');
var Autonomous = require('./index.js');
var co = require('co');

var server = require('./fakeserver')
var base = 'http://localhost:' + server.address().port;


co(function *() {
  var autonomous = yield new Autonomous();
  yield autonomous.open(base);

  console.log(yield autonomous.get('content'));
  yield autonomous.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
  yield autonomous.evaluate(function() {
    $('input').val('testing').closest('form').submit();
  })

  yield autonomous.untilLoad();
  console.log(yield autonomous.get('content'));

  autonomous.exit();
  server.close();

})();