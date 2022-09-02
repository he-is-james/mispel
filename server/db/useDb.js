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
  getRoomWords,
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
    // await deleteRoom(dbo, 'Shuby');
    // await createRoom(dbo, 'Shuby', 'james');
    // await joinRoom(dbo, 'Shuby', 'sunny'); 
    // await updateRoomSettings(dbo, 'Shuby', -1, 20);
    // await updateRoomGame(dbo, 'Shuby', {james: 10, sunny: 20}, {'resternat': 2, 'resatreant': 1})
    // const result = await getRoomWords(dbo, 'Shuby');
    // console.log(result);
    console.log('complete');
    db.close();
})