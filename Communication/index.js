var Room = require('./room');

module.exports = (function(){
  /*
    Communication
    Description:
      This module will manage all communications.
      TODO: Implementation
    author: Rene Loperena
  */
  function Communication(server){
    this.io = require('socket.io')(server);
    this.room = Room(this.io);
  }
  
  /*
    .startCommunication
    params: intervalTime
    returns: (nothing)
    description:
      Will start sending information to the display client every 'intervalTime' (in ms)
    author: Rene Loperena
  */
  Communication.prototype.startCommunication = function(intervalTime) {
    var interval = intervalTime || 50;
    setInterval(interval,function(){
      this.room.sendAllClientsInformation();
    });
  };




  return Communication;
})();