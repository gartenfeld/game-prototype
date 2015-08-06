var Client = require('./Client');
var Display = require('./Display');
var _ = require('underscore');

module.exports = (function() {
  /*
    Room
    Description:
      This object will manage all the display and client endpoints and manage their 
      communications.
    author: David Rosson / Rene Loperena
  */
  function Room(io) {
    this.io = io;
    this.display = null;
    this.clients = [];
  }

  /*
    .negotiateConnection
    params: (nothing)
    returns: (nothing)
    description:
      This will negotiate the initial connection with the different connections received, 
      ask if it is a display endpoint or a client, and act accordingly.
    author: David Rosson / Rene Loperena
    modified: Rene Loperena
  */
  Room.prototype.negotiateConnection = function() {
    var self = this;
    /*
      On a connection event it will ask the new socket for an identity, if it is a client
      will create a new Client object and push it to the Clients array, else it will set it
      as the display object.
    */
    self.io.on('connection', function(socket) {
      socket.on('identity', function(identity) {
        if (identity === 'client') {
          /*
            Creates the new Client with it's corresponding socket and a uniqueId, then
            it pushes it into the array.
          */
          self.clients.push(new Client(socket, self.generateGUID()));
        } else if (identity === 'display') {
          self.display = new Display(socket);
        }
      });
      socket.emit('identity', 'What are you?');
    });
  };

  /*
    .generateGUID
    params: (nothing)
    returns: uniqueId (string)
    description:
      This function will generate a unique Id for the client;
    author: David Rosson / Rene Loperena
  */
  Room.prototype.generateGUID = function() {
    return Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1);
  };

  /*
    .sendAllClientsInformation
    params: (nothing)
    returns: (nothing)
    description:
      This function will gather all the clients information, map them using underscore and
      sending everything to the display.
    author: Rene Loperena
  */
  Room.prototype.sendAllClientsInformation = function() {
    var self = this;
    self.display.sendDisplayInformation(_.map(self.clients, function(client){
      return client.getClientInformation();
    }));
  };


  return Room;
})();