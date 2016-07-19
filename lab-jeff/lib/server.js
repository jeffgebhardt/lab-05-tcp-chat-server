'use strict';

const net = require('net');

// const Eventmmiter = require('events').EventEmmiter;
// let EE = new EventEmmiter();

let clientsPool = [];
let serverPort = 3000;

// function Pool() {
//
// };


let server = net.createServer(function(socket){

  socket.tempName = 'Guest-' + (clientsPool.length + 1);
  clientsPool.push(socket);

  console.log(socket.tempName + ' connected to the server.');
  socket.write('Welcome to the chat ' + socket.tempName);
  socket.pipe(process.stdout);
  socket.on('data', function(data){
    let result = socket.tempName + ': ' + data;
    clientsPool.forEach(function(client) {
      if (client !== socket)
        client.write(result);
    });

    if (data == 'END\r\n')
      socket.end();
  });

  socket.on('end', function(){
    console.log(socket.tempName + ' disconnected from the server');
    clientsPool.splice(clientsPool.indexOf(socket), 1);
  });
});

server.listen(serverPort, function(){
  console.log('Server is running...');
});
