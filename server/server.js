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
  socket.on('host-game', (data) => {
    console.log(`room: ${data.roomID} created`);
    socket.playerName = data.playerName;
    socket.isHost = true;
    socket.join(data.roomID);
  })

  socket.on('find-room', (data) => {
    const rooms = io.of("/").adapter.rooms;
    socket.emit(rooms.get(data.name) ? 'room-exist' : 'room-dne');
  })

  socket.on('sent-player-list', (data) => {
    io.to(data.requesterID).emit('sent-player-list', {playerList: data.playerList});
  })
  socket.on('player-join', (data) => {
    socket.playerName = data.playerName;
    socket.join(data.roomID);
    socket.to(data.roomID).emit('request-player-list', {requesterID: data.socketID});
    socket.to(data.roomID).emit('player-join', {playerName: data.playerName});
  })
  socket.on('start-game', (data) => {
    io.to(data.roomID).emit('start-player')
  })
  socket.on("disconnecting", async (reason) => {
    
    const [, roomID] = socket.rooms;
    if (socket.isHost) {
      const sockets = await io.in(roomID).fetchSockets();
      if (sockets.length > 1) {
        const newHost = sockets[1];
        newHost.isHost = true;
        io.to(newHost.id).emit('become-host');
      }
    }
    socket.to(roomID).emit('player-left', {playerName: socket.playerName});
  })
  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnect`);
  });
})

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
