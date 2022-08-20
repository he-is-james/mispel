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
    console.log(`room: ${data.name} created`);
    socket.join(data.name);
  })

  socket.on('find-room', (data) => {
    console.log('hi');
    const rooms = io.of("/").adapter.rooms;
    socket.emit(rooms.get(data.name) ? 'room-exist' : 'room-dne');
  })

  socket.on('sent-player-list', (data) => {
    io.to(data.requesterID).emit('sent-player-list', {playerList: data.playerList});
  })
  socket.on('player-join', (data) => {
    console.log(data);
    socket.join(data.roomID);
    socket.to(data.roomID).emit('request-player-list', {requesterID: data.socketID});
    socket.to(data.roomID).emit('player-join', {playerName: data.playerName});
  })

  socket.on("disconnect", (reason) => {
    console.log('disconnect');
  });
})

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
