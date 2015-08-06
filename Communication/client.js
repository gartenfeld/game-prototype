module.exports = (function(){
  /*
    Client
    Description:
      This object will be in charge of receiving all the information through sockets
      from the client and update the client values.

    author: David Rosson / Rene Loperena
  */
  function Client(socket,uniqueId){
    this.uniqueId = uniqueId;
    this.socket = socket;
    this.currentVelocity = {x: 0 , y: 0};
    this.initializeClient();
  }

  /*
    .initializeClient
    params: (nothing)
    returns: (nothing)
    description:
      Set up all the events that the client may receive and act upon them.
    author: David Rosson / Rene Loperena
  */
  Client.prototype.initializeClient = function() {
    var self = this;
    /*
      On the 'updateVelocity' event, we will update the currentVelocity to
      the one received from the client.
    */
    this.socket.on('updateVelocity', function(velocity){
      self.currentVelocity = velocity;
    });

  };

  /*
    .getClientInformation
    params: (nothing)
    returns: information (Object with id and velocity)
    description:
      Returns the client information inside a new object.
    author: Rene Loperena
  */
  Client.prototype.getClientInformation = function(){
    return {
      id: this.uniqueId,
      velocity: this.currentVelocity
    };
  };


  return Client;

})();