const express = require('express');

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

module.exports = router;
