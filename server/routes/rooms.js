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
    getRandomWord,
    getMP3,
    createRoom,
    joinRoom,
    getRoom,
} = require('../db/database');



const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to mispel!');
});

router.get('/create-room', (req, res) => {
  res.send('Create room!');
});

router.get('/join-room', (req, res) => {
  res.send('Join room!');
});

router.get('/room/:id', (req, res) => {
  const roomId = req.params.id;
  res.send(`Room ID: ${roomId}!`);
});

router.get("/api/getSound", (req, res) => {
  connectToDb(async () => {
    db = getDb();
    dbo = db.db('db');
    const audioBuffer = new Buffer.from((await getRandomWord(dbo)).audio.buffer, 'base64');
    db.close();
    res.send({buffer: audioBuffer});
  })
});

module.exports = router;
