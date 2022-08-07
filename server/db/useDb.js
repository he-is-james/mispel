const {ObjectId} = require("mongodb");
const {connectToDb, getDb} = require('./conn');
const {getSpeech} = require('./textToSpeech');
//database operations
const {
    addWords,
    findWords,
    deleteWords,
    updateWords,
    getRandomWord,
    getMP3,
    updatePlayerScores,
    createRoom,
    joinRoom,
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
    // const wordArray = await getWordArray(900);
    // console.log(wordArray);
    // await addWords(dbo, wordArray);
    // await deleteWords(dbo, {});
    console.log('complete');
    db.close();
})