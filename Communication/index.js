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
  }

  return Communication;
})();