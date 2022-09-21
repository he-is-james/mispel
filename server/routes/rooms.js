const express = require('express');
const { MongoClient } = require("mongodb");
const { connectToDb, getDb } = require('../db/conn');
const { getSpeech } = require('../db/textToSpeech');
//database operations
const {
    getRandomWords,
    createRoom,
    joinRoom,
    getRoomInfo,
    updateRoomSettings,
    updateRoomGame,
    deleteRoom,
    checkRoomExists,
} = require('../db/database');

module.exports = function(app, dbo) {
  app.get('/', (req, res) => {
    res.send('Welcome to mispel!');
    // TODO: send leaderboard information
  });

  app.post('/room/create-room', async (req, res, next) => {
    const roomID = req.body.roomID;
    const exists = await (checkRoomExists(dbo, roomID))
    if (exists) {
      await createRoom(dbo, req.body.roomID, req.body.hostName);
    const name = req.body.hostName;
    res.send(`Room ID: ${roomID} created by ${name}!`);
    } else {
      next(`Room ID: ${roomID} already exists`)
    }
    
  });

  app.patch('/room/join-room', async (req, res) => {
    await joinRoom(dbo, req.body.roomID, req.body.playerName)
    const roomId = req.body.roomID;
    const name = req.body.playerName;
    res.send(`Room ID: ${roomId} joined by ${name}!`);
  });

  app.patch('/room/update-room-settings', async (req, res) => {
    await updateRoomSettings(dbo, req.body.roomID, req.body.wordsCount, req.body.timeLimit);
    const roomId = req.body.roomID;
    res.send(`Room ID: ${roomId} settings updated!`);
  });

  app.put('/room/update-room-game', async (req, res) => {
    await updateRoomGame(dbo, req.body.roomID, req.body.playerScores, req.body.wordAttempts);
    const roomId = req.body.roomID;
    res.send(`Room ID: ${roomId} game updated!`);
  });

  app.get('/room/info', async (req, res) => {
    const info = await getRoomInfo(dbo, req.query.roomID);
    res.send(info);
  });

  app.delete('/room/delete-room', (req, res) => {
    connectToDb(async () => {
      const db = getDb();
      dbo = db.db('db');
      await deleteRoom(dbo, req.body.roomID);
      db.close();
    });
    const roomId = req.params.id;
    res.send(`Room ID: ${roomId} is deleted!`);
  });

  // app.get("/api/getSound", (req, res) => {
  //   connectToDb(async () => {
  //     db = getDb();
  //     dbo = db.db('db');
  //     const audioBuffer = new Buffer.from((await getRandomWords(dbo)).audio.buffer, 'base64');
  //     db.close();
  //     res.send({buffer: audioBuffer});
  //   })
  // });

  return app;
}