var express = require('express');
var morgan = require('morgan');
var Communication = require('./Communication');
/*
  Application
  Description:
    This object will contain the express application.
  author: Rene Loperena
*/
var Application = function() {
  var self = this;

  /*
    .setupVariables
    params: (nothing)
    returns: (nothing)
    description:
      This function will create the ipaddress and port for the application,
      it will use the environment variables wich are configured for OpenShift
      deployment if available, else it will default them to 0.0.0.0:8080.
    author: Rene Loperena
  */
  self.setupVariables = function() {
    self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
    self.port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

    if (typeof self.ipaddress === 'undefined') {
      console.warn('No OPENSHIFT_NODEJS_IP var, using 0.0.0.0');
      self.ipaddress = '0.0.0.0';
    }
  };

  /*
    .initializeServer
    params: (nothing)
    returns: (nothing)
    description:
      This will create the express app and add all the middleware and routes.
    author: Rene Loperena
  */
  self.initializeServer = function() {
    self.app = express();
    self.app.use(morgan('combined'));
    self.app.use(express.static('public'));
  };

  /*
    .initialize
    params: (nothing)
    returns: (nothing)
    description:
      This function will call the setupVariables() function and initializeServer() functions
      in order to get everything set up.
    author: Rene Loperena
  */
  self.initialize = function() {
    self.setupVariables();
    self.initializeServer();
  };

  /*
    .start 
    params: (nothing)
    returns: (nothing)
    description:
      This function will start the server.
      NOTE: Use .startWithSocketCommunication instead
    author: Rene Loperena
  */
  self.start = function() {
    self.app.listen(self.port, self.ipaddress, function() {
      console.log('%s: Node server started on %s:%d ...',
        Date(Date.now()), self.ipaddress, self.port);
    });
  };

  /*
    .startWithSocketCommunication
    params: (nothing)
    returns: (nothing)
    description:
      This function will create a new Communication Object and start the server,
      it is used over .start.
    author: Rene Loperena
  */
  self.startWithSocketCommunication = function() {
    var server = require('http').Server(self.app);
    self.communication = new Communication(server);
    server.listen(self.port, self.ipaddress, function() {
      console.log('%s: Node server started on %s:%d ...',
        Date(Date.now()), self.ipaddress, self.port);
      self.communication.startCommunication();
    });
  };
};

//Creates a new Application Object, initializes and starts it.
var app = new Application();
app.initialize();
app.startWithSocketCommunication();