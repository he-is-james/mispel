const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
import session from "express-session";


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


io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  console.log(sessionID)
  if (sessionID) {
    console.log('something here')
    // const session = sessionStore.findSession(sessionID);
    // if (session) {
    //   socket.sessionID = sessionID;
    //   return next();
    // }
  }
  // create new session
  socket.sessionID = randomId();
  return next();
});


io.on('connection', (socket) => {
  socket.emit("session", {
    sessionID: socket.sessionID,
  });

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

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
