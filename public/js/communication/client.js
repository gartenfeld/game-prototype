var client = io.connect('http://localhost:8080');
console.log(client);
client.on('identity',function(){
  console.log('Server asked for identity');
  client.emit('identity', 'client');
});


var updateVelocity = function(x,y){
 client.emit('updateVelocity', {x: x , y: y});
};