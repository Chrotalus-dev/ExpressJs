// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//     // Extract the url path from the request.
//     const {url} = req;
//     console.log(`The URL path is: ${url}`);

//     if (url === '/') {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('Hello World')
//     } else if (url === '/favicon.ico') {
//         res.statusCode = 200;
//         res.end('')
//     } else {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('This is not the home page')
//     }
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });

  io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

server.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
  });
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });


