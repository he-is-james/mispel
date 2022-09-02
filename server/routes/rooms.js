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
    getRoom,
    updateRoomSettings,
    updateRoomGame,
} = require('../db/database');



const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to mispel!');
  // TODO: send leaderboard information
});

router.post('/room/create-room', (req, res) => {
  connectToDb(async () => {
    const db = getDb();
    dbo = db.db('db');
    await createRoom(dbo, req.body.roomID, req.body.hostName);
    db.close();
  });
  const roomID = req.body.roomID;
  const name = req.body.hostName;
  res.send(`Room ID: ${roomID} created by ${name}!`);
});

router.post('/room/join-room', (req, res) => {
  connectToDb(async () => {
    const db = getDb();
    dbo = db.db('db');
    await joinRoom(dbo, req.body.roomID, req.body.playerName);
    db.close();
  });
  const roomId = req.body.roomID;
  const name = req.body.playerName;
  res.send(`Room ID: ${roomId} joined by ${name}!`);
});

router.post('/room/update-room-settings', (req, res) => {
  connectToDb(async () => {
    const db = getDb();
    dbo = db.db('db');
    await updateRoomSettings(dbo, req.body.roomID, req.body.wordsCount, req.body.timeLimit);
    db.close();
  });
  const roomId = req.body.roomID;
  res.send(`Room ID: ${roomId} settings updated!`);
});

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

// likely switch to post
router.get('/:id/waiting-room', (req, res) => {
  const roomId = req.params.id;
  res.send(`Room ID: ${roomId} waiting!`);
});

// TODO: 
router.get('/:id/game-room', (req, res) => {
  const roomId = req.params.id;
  res.send(`Room ID: ${roomId}!`);
});

// TODO: make delete room functionality

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
