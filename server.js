var express = require('express');
var morgan = require('morgan');

var Application = function() {

    var self = this;

    self.setupVariables = function() {
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        if (typeof self.ipaddress === "undefined") {
            console.warn('No OPENSHIFT_NODEJS_IP var, using 0.0.0.0');
            self.ipaddress = "0.0.0.0";
        };
    };


    self.initializeServer = function() {
        self.app = express();
        self.app.use(morgan('combined'));
        self.app.use(express.static('public'));
        
    };


    self.initialize = function() {
        self.setupVariables();
        self.initializeServer();
    };

    self.start = function() {
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};  

var app = new Application();
app.initialize();
app.start();
