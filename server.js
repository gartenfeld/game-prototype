var express = require('express');
var morgan = require('morgan');

var Application = function() {

  var self = this;

  self.setup = function() {
    self.ip     = process.env.OPENSHIFT_NODEJS_IP;
    self.port   = process.env.OPENSHIFT_NODEJS_PORT || 8080;
    if (self.ip === undefined) {
      console.warn('Env var OPENSHIFT_NODEJS_IP not found, using 0.0.0.0');
      self.ip = '0.0.0.0';
    }
  };

  self.initialize = function() {
    self.setup();
    self.app = express();
    self.app.use(morgan('combined'));
    self.app.use(express.static('public')); 
  };

  self.start = function() {
    self.app.listen(self.port, self.ip, function() {
      console.log('%s: Node server started on %s:%d ...',
        Date(Date.now()), self.ip, self.port);
    });
  };

};  

var app = new Application();
app.initialize();
app.start();
