const {ObjectId} = require("mongodb");
const {connectToDb, getDb} = require('./conn');
const {getSpeech} = require('./textToSpeech');
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
  updateRoomSettings,
  updateRoomGame,
  deleteRoom,
  getRoom,
} = require('./database');

const wordJSON = require("../../words/words.json");


async function getWordArray(chunkSize) {
  let words = [];
  for (let i = 0; i < wordJSON.words.length+chunkSize; i+=chunkSize) {
     words = words.concat(await Promise.all((wordJSON.words.slice(i,i+chunkSize)).map(async (x) => {
      const speech = await getSpeech(x.word);
      return {
        word: x.word,
        definition: x.definition,
        audio: speech,
      }
    })));
    console.log(`converted ${i+chunkSize} words to speech`);
    await new Promise(r => setTimeout(r, 61000));
  }
  return words;
}

connectToDb(async () => {
    db = getDb();
    dbo = db.db('db');
    // await getRandomWords(dbo, 2);
    // await createRoom(dbo, 'Shuby');
    // await joinRoom(dbo, 'Shuby', 'james'); 
    // await getRoom(dbo, 'Shuby');
    // await updateRoomSettings(dbo, 'rip', 10, 10);
    // await updateRoomGame(dbo, 'rip', { 'james': 20, 'sunny': 10});
    // await deleteRoom(dbo, 'rip');
    console.log('complete');
    db.close();
})