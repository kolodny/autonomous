var http = require('http');
var assert = require('assert');
var co = require('co');
var Autonomous = require('..');

describe('autonomous', function() {
  it('should eventually return an object', function(next) {
    co(function *() {
      var autonomous = yield new Autonomous();
      assert.equal(typeof autonomous, 'object');
      next();
    })();
  });

  it('should be closeable', function(next) {
    co(function *() {
      var autonomous = yield new Autonomous();
      autonomous.exit();
      next();
    })();
  });
});
