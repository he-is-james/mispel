const express = require('express');
const {MongoClient} = require("mongodb");
const {connectToDb, getDb} = require('../db/conn');
const {getSpeech} = require('../db/textToSpeech');
//database operations
const {
    addWords,
    findWords,
    deleteWords,
    updateWords,
    getRandomWords,
    getMP3,
    createRoom,
    joinRoom,
    getRoomWords,
    updateRoomSettings,
    updateRoomGame,
    deleteRoom,
} = require('../db/database');

const databaseCall = (callback) => {
  connectToDb(async() => {
    const db = getDb();
    dbo = db.db('db');
    await callback(dbo);
    db.close();
  })
}

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to mispel!');
  // TODO: send leaderboard information
});

router.post('/room/create-room', (req, res) => {
  databaseCall((dbo) => createRoom(dbo, req.body.roomID, req.body.hostName));
  const roomID = req.body.roomID;
  const name = req.body.hostName;
  res.send(`Room ID: ${roomID} created by ${name}!`);
});

router.post('/room/join-room', (req, res) => {
  databaseCall((dbo) => joinRoom(dbo, req.body.roomID, req.body.playerName));
  const roomId = req.body.roomID;
  const name = req.body.playerName;
  res.send(`Room ID: ${roomId} joined by ${name}!`);
});

// replace with patch
router.post('/room/update-room-settings', (req, res) => {
  databaseCall()
  updateRoomSettings(dbo, req.body.roomID, req.body.wordsCount, req.body.timeLimit);
  const roomId = req.body.roomID;
  res.send(`Room ID: ${roomId} settings updated!`);
});

// replace with put
router.post('/room/update-room-game', (req, res) => {
  connectToDb(async () => {
    const db = getDb();
    dbo = db.db('db');
    await updateRoomGame(dbo, req.body.roomID, req.body.playerScores, req.body.wordAttempts);
    db.close();
  });
  const roomId = req.body.roomID;
  res.send(`Room ID: ${roomId} game updated!`);
});

// update the functio
router.get('/room/info', (req, res) => {
  // let result;
  // connectToDb(async () => {
  //   const db = getDb();
  //   dbo = db.db('db');
  //   // TODO: update to get other settings info
  //   result = await getRoomWords(dbo, req.params.roomID);
  //   db.close();
  // });
  const roomId = req.params.config;
  console.log(roomId)
  res.send(`Room ID: ${roomId} words!`);
  // return result;
});

router.delete('/room/delete-room', (req, res) => {
  connectToDb(async () => {
    const db = getDb();
    dbo = db.db('db');
    await deleteRoom(dbo, req.body.roomID);
    db.close();
  });
  const roomId = req.params.id;
  res.send(`Room ID: ${roomId} is deleted!`);
});

// router.get("/api/getSound", (req, res) => {
//   connectToDb(async () => {
//     db = getDb();
//     dbo = db.db('db');
//     const audioBuffer = new Buffer.from((await getRandomWords(dbo)).audio.buffer, 'base64');
//     db.close();
//     res.send({buffer: audioBuffer});
//   })
// });

module.exports = router;
