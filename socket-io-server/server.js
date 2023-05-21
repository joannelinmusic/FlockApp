const http = require('http');
const server = http.createServer();

// Specify the port number on which the server will listen
const port = 3000;
const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');
  
    // Handle other events from the client
    socket.on('message', (data) => {
      console.log('Received message:', data);
    });
  
    // Emit events to the client
    socket.emit('greeting', 'Hello, client!');
  });

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });