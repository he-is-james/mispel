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

router.get('/room/create-room/:id', (req, res) => {
  connectToDb(async () => {
    db = getDb();
    dbo = db.db('db');
    // TODO: replace req.params with req.body.name on frontend side
    await createRoom(dbo, req.params.id);
    db.close();
  })
  const roomId = req.params.id;
  res.send(`Room ID: ${roomId} created!`);
})

router.get('/room/join-room/:id/:name', (req, res) => {
  connectToDb(async () => {
    db = getDb();
    dbo = db.db('db');
    // TODO: replace req.params with req.body.name on frontend side
    await joinRoom(dbo, req.params.id, req.params.name);
    db.close();
  })
  const roomId = req.params.id;
  const name = req.params.name
  res.send(`Room ID: ${roomId} joined by ${name}!`);
})

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
