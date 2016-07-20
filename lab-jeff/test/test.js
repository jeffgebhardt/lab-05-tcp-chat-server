const expect = require('chai').expect;
const net = require('net');

const server0 = require('../lib/server0.js');

server0.startServer();

describe('chat server', function() {
  it('should allow clients to message each other', function() {

    let client1 = net.connect({port: 3000, host: 'localhost'});

    client1.on('data', function(data) {
      expect(data.toString()).to.eql('Welcome to the server Guest');
      client1.end();
    });
  });
});
