const {MongoClient} = require("mongodb");
const {connectToDb, getDb} = require('./conn');
//database operations
const {
    addWords,
    findWords,
    deleteWords,
    updateWords,
    getRandomWord,
    addMP3,
    getMP3,
    createRoom,
    joinRoom,
    getRoom,
} = require('./database');

let randomword = '';


const wordJSON = require("../../words/words.json");

const wordsArray = (wordJSON.words).map(x => {return {word: x}});

connectToDb(async () => {
    db = getDb();
    dbo = db.db('db');
    const room = {
        name: 'test',
        players: [
          {
            name: "shudumb",
            score: 0
          }
        ],
        words: {
          word1: "restaurant"
        },
        settings: {
          time: 30
        }
      }
    await createRoom(dbo, room);
    console.log(`created room: ${room}`);
    db.close();
})