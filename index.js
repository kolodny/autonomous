var phantom = require('node-phantom-simple');
var _ = require('lodash');

var noop = function() {};

module.exports = Autonomous;

_.extend(Autonomous.prototype, {
  open: open,
  done: exit,
  exit: exit,
  includeJs: includeJs,
  injectJs: injectJs,
  get: get,
  set: set,
  untilLoad: untilLoad,
  evaluate: evaluate
});

function Autonomous(options) {
  var self = this;
  var settings = _.defaults(options, {
  });

  self.onLoadFinishedQueue = []

  return function(cb) {
    self.cb = cb;
    phantom.create(function(err, ph) {
      if (err) throw err;
      self.ph = ph;
      ph.createPage(function(err, page) {
        if (err) throw err;
        page.onLoadFinished = function() {
          (self.onLoadFinishedQueue.pop() || noop)();
        }
        page.onError = function(msg) {
          var err = new Error('phantomError: ' + msg[0]);
          err.evalStack = msg[1];
          (self.cb || noop)(err);
        }
        self.page = page
        cb(null, self);
      });
    }, settings);
  };


}

function open(options) {
  var settings = defaultsHelper(options, {}, true);
  var self = this;

  return function(cb) {
    self.cb = cb;
    self.page.open(settings.url, function(err, status) {
      if (status !== 'success') cb(new Error('status was ' + status));
      cb();
    });
  }
}

function exit() {
  this.ph.exit();
}

function includeJs(options) {
  var self = this;
  var settings = defaultsHelper(options, {}, true);

  return function(cb) {
    self.cb = cb;
    self.page.includeJs(settings.url, cb);
  }
}

function injectJs(options) {
  var self = this;
  var settings = defaultsHelper(options, {}, true);

  return function(cb) {
    self.cb = cb;
    self.page.injectJs(settings.url, cb);    
  }

}

function get(prop) {
  var self = this;

  return function(cb) {
    self.cb = cb;
    self.page.get(prop, cb);
  }
}

function set(prop, val) {
  var self = this;

  return function() {
    self.page.set(prop, val, cb);
  }
}

function untilLoad(ms) {
  var self = this;

  return function(cb) {
    self.cb = cb;
    self.onLoadFinishedQueue.push(cb);
    if (ms) {
      setTimeout(function() {
        cb(new Error('Timed out waiting for page load'));
      }, ms);
    }
  }
}

function evaluate() {
  var self = this;
  var applyer = [].slice.call(arguments);
  return function(cb) {
    self.cb = cb;
    applyer.splice(1, 0, cb);
    self.page.evaluate.apply(this.page, applyer);
  };
}




function defaultsHelper(options, defaults, isString) {
  if (isString && typeof options === 'string') {
    options = { url: options };
    return _.defaults(options, defaults);
  }
}
