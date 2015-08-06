var express = require('express');
var morgan = require('morgan');

/*
  Application
  Description:
    This object will contain the express application.
  Author: Rene Loperena
*/

var Application = function() {

  var self = this;

  /*
    .setup
    Params: (n/a)
    Returns: (n/a)
    Description:
      This function will retrieve the host address and port of the production 
      server from the environment variables configured for OpenShift, if these 
      aren't available, the settings will default to 0.0.0.0:8080. 
    Author: Rene Loperena
    Changes: David Rosson
  */

  self.setup = function() {
    self.ip     = process.env.OPENSHIFT_NODEJS_IP;
    self.port   = process.env.OPENSHIFT_NODEJS_PORT || 8080;
    if (self.ip === undefined) {
      console.warn('Env var OPENSHIFT_NODEJS_IP not found, using 0.0.0.0');
      self.ip = '0.0.0.0';
    }
  };

  /*
    .initialize
    Params: (n/a)
    Returns: (n/a)
    Description:
      This function will call the setup() function, create an express app, and 
      load the middleware for logging and static file serving.
    Author: Rene Loperena
    Changes: David Rosson
  */

  self.initialize = function() {
    self.setup();
    self.app = express();
    self.app.use(morgan('combined'));
    self.app.use(express.static('public')); 
  };

  /*
    .start
    Params: (n/a)
    Returns: (n/a)
    Description:
      This function will start the server.
    Author: Rene Loperena
  */

  self.start = function() {
    self.app.listen(self.port, self.ip, function() {
      console.log('%s: Node server started on %s:%d ...',
        Date(Date.now()), self.ip, self.port);
    });
  };

};  


// Creates a new Application object.
var app = new Application();
// Initializes the app, and starts the server.
app.initialize();
app.start();