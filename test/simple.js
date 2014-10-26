var http = require('http');
var assert = require('assert');
var co = require('co');
var path = require('path');
var Autonomous = require('..');

var server = require('./utils/server.js');

var base = 'http://localhost:' + server.address().port;


describe('autonomous', function() {
  var autonomous;

  beforeEach(function(next) {
    co(function *() {
      autonomous = yield new Autonomous();
      next();
    })();
  });

  it('should be able to get content', function(next) {
    co(function *() {
      yield autonomous.open(base);
      var content = yield autonomous.get('content');
      assert.equal(content, '<html><head></head><body><form action="submit"><input name="n"><button></button></form></body></html>');
      next();
    })();
  });

  it('should be able to inject and evaluate javascipt', function(next) {
    this.timeout(5000);
    co(function *() {
      yield autonomous.open(base);
      var jquery = path.join(path.resolve(__dirname), 'utils', 'jquery.js');
      yield autonomous.injectJs(jquery);

      yield autonomous.evaluate(function() {
        setTimeout(function() {
          $('input').val('testing').closest('form').submit();
        }, 1000);

      });
      yield autonomous.untilLoad();
      var content = yield autonomous.get('content');
      assert.equal(content, '<html><head><script>setTimeout("document.body.innerHTML = location.search")<\/script></head><body>?n=testing</body></html>')

      next();
    })();
  });


})

co(function *() {
  var autonomous = yield new Autonomous();

  yield autonomous.open(base);

  console.log('')
  console.log(yield autonomous.get('content'));
  console.log('')

  yield autonomous.injectJs('../jquery.js');

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

});
