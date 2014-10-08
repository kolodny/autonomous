var http = require('http');
var Autonomous = require('./index.js');
var co = require('co');

var server = require('./fakeserver')
var base = 'http://localhost:' + server.address().port;


co(function *() {
  var autonomous = yield new Autonomous();

  yield autonomous.open(base);

  console.log('')
  console.log(yield autonomous.get('content'));
  console.log('')

  yield autonomous.injectJs('jquery.js');

  yield autonomous.evaluate(function() {
    setTimeout(function() {
      $('input').val('testing').closest('form').submit();  
    }, 2000)
    
  });

  yield autonomous.untilLoad();

  console.log('')
  console.log(yield autonomous.get('content'));
  console.log('')

  autonomous.exit();
  server.close();

})();
