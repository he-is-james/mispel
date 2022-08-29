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
} = require('../db/database');



const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to mispel!');
  // TODO: send leaderboard information
});

// TODO: player joins and it updates database
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
