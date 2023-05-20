const io = require('socket.io-client');
const socket = io('http://localhost:3000'); // Replace with your server URL

socket.on('greeting', (data) => {
    console.log('Received greeting:', data);
  });

socket.emit('message', 'Hello, server!');