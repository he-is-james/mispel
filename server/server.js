const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
})
const initializeDatabase = require('./db/conn');
const routes = require('./routes/rooms');

app.use(cors());
app.use(bodyParser.json());

io.on('connection', (socket) => {
  socket.on('does-room-exist', (data) => {
    const rooms = io.of("/").adapter.rooms;
    const room = rooms.get(data.roomID);
    const {isCreating, ...responseData} = data;
    let message;
    if (data.isCreating) {
      message = room ? ['room-id-taken'] : ['room-id-available', responseData];
    }
    else {
      message = room ? ['room-does-exist', responseData] : ['room-does-not-exist'];
    }
    socket.emit(...message);
  })

  socket.on('check-name', async (data) => {
    const playerName = data.playerName;
    const sockets = await io.in(data.roomID).fetchSockets();
    const isNameTaken = sockets.reduce((doesExist, currSocket) => {
      return doesExist || (currSocket.playerName === playerName);
    }, false);
    if (isNameTaken) {
      socket.emit('name-taken');
    }
    else {
      socket.emit('name-available', data);
    }
  })

  socket.on('host-game', (data) => {
    socket.playerName = data.playerName;
    socket.isHost = true;
    socket.join(data.roomID);
    console.log(`room: ${data.roomID} has been created`);
  })

  socket.on('leave-room', (room) => {
    socket.leave(room);
  })
  socket.on('sent-player-list', (data) => {
    io.to(data.requesterID).emit('sent-player-list', {playerList: data.playerList});
  })

  socket.on('player-join', (data) => {
    const roomID = data.roomID;
    const playerName = data.playerName;
    socket.playerName = playerName;
    socket.isHost = false;
    socket.join(roomID);
    socket.to(roomID).emit('request-player-list', {requesterID: data.socketID});
    socket.to(roomID).emit('player-join', {playerName: playerName});
  })

  socket.on('player-kick', (data) => {
    io.in(data.roomID).fetchSockets().then(sockets => {
      const toKick = sockets.find(socket => socket.playerName === data.playerName)
      io.in(data.roomID).emit('player-left', {playerName: data.playerName})
      toKick.leave()
      console.log(`Player ${data.playerName} kicked from ${data.roomID}`)
    })
  })
  
  socket.on('start-game', (data) => {
    socket.to(data.roomID).emit('start-player');
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

initializeDatabase().then(dbo => {
  routes(app, dbo)
}).catch(err => {
  console.error('Failed to connect to the database!');
  console.error(err);
  process.exit(1);
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
