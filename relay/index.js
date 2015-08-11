var Room = require('./room');

module.exports = (function(){

  /*
    Communication
    Description:
      This module will initialize a room with the server's socket passed in.
    Author: Rene Loperena
  */

  function Communication(server){
    var io = require('socket.io')(server);
    this.room = new Room(io);
  }
  
  /*
    .start
    Params: intervalTime
    Returns: (nothing)
    Description:
      This method will start sending all joystick updates to the display 
      at the set interval (in ms).
    Author: Rene Loperena
  */

  Communication.prototype.start = function(interval) {
    var self = this;
    interval = interval || 50;
    setInterval(function(){
      self.room.sendAllClientsInformation();
    },interval);
  };

  return Communication;

}());