const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const cors = require('cors');
const port = 5000;
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
})

app.use(cors());
app.use(require('./routes/rooms'));

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('host-game', (data) => {
    socket.join(data.name);
  })

  socket.on('find-room', (data) => {
    const rooms = io.of("/").adapter.rooms;
    socket.emit(rooms.get(data.name) ? 'room-exist' : 'room-dne');
  })

  socket.on('player-join', (data) => {
    socket.join(data)
  })
})

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
