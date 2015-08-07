var display = io.connect('http://localhost:8080');
console.log(display);
display.on('identity',function(){
  console.log('Server asked for identity');
  display.emit('identity', 'display');
});

display.on('displayInformation', function(displayInfo){
  console.log('Information'+ JSON.stringify(displayInfo));
});
