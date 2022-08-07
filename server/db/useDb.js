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
    updatePlayerScores,
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
    await createRoom(dbo, 'leetcodeHard', 'ISmurfInterviews');
    console.log(`created room`);
    db.close();
})