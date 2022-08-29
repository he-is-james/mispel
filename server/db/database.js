const {ObjectId} = require("mongodb");
const fs = require('fs');

// TODO: do check that there can't be sql injections

// ==========================================================================
// Important functions for adjusting words in database collection
const addWords = async (db, toInsert) => {
    const result =  await db.collection("words").insertMany(toInsert);
    console.log(`${result.insertedCount} new words added with ids: `);
}   

const deleteWords = async (db, toRemove) => {
    const result = await db.collection("words").deleteMany(toRemove);
    console.log(`${result.deletedCount} words deleted`);
} 

const findWords = async (db, toFind) => {
    let count = 0;
    let docs = [];
    const cursor = await db.collection("words").find(toFind);
    cursor.forEach((x) => {
        count+=1;
        docs.push(x);
    });
    console.log(count + " words found");
    console.log(count ? docs : "");
}

const updateWords = async (db, toUpdate, updateTo) => {
    const result = await db.collection("words").updateMany(toUpdate, [{$set: {word: updateTo}}]);
    console.log(`${result.modifiedCount} words updated`);
    return result
}

const getMP3 = async (db) => {
    const mp3 = await db.collection('fat').findOne({_id : ObjectId('62cb66b990eefb72169af51a')})
    const mp3File = new Buffer.from(mp3.value.buffer, 'base64')
    fs.writeFileSync('output_copy.mp3', mp3File);
    return mp3File;
}
// ==========================================================================

// Creates room in database containing room, user, and word info
const createRoom = async (db, roomName) => {
    const wordsArray = await getRandomWords(db, 15)
    const newRoom = {
        name: roomName,
        players: {
            // playerName: 0
        },
        currentWordPosition: 0,
        words: wordsArray,
            // [{ word: "restaurant", definition: "a place that people go to eat", audio: Binary},
            // { word: "reliable", definition: "adjective describing someone as dependable", audio: Binary},
            // ...]
        attempts: [
            // {"resterant": 3, "retaurent": 3, ...},
            // {"relable": 5, "realable": 2},
            // ...
        ],
        time: 15,
    }
    await db.collection("rooms").insertOne(newRoom);
} 

// Adds player to players object in database to initialize scores
const joinRoom = async (db, roomName, player) => {
    const players = 'players.' + player;
    const addPlayer = { '$set' : {} };
    addPlayer['$set'][players] = 0;
    const result = await db.collection("rooms").updateOne(
      {name: roomName},
      addPlayer,
      upsert=false,
    );
    // TODO: error check
    return;
}

// update room function with settings

const getRoom = async (db, roomName) => {
    const result = await db.collection("rooms").find(
      {
        name: roomName
      }
    ).toArray();
    console.log(result[0].players)
    // TODO: error check
  }

  const getRandomWords = async (db, number) => {
    var cursor = (db.collection("words").aggregate([{ $sample: { size: number } }]));
    const words = (await cursor.toArray())
    words.forEach((word) => {
        delete word._id;
    })
    return words;
}

// TODO: update with recent
const updatePlayerScores = async (db, roomName, playerName, score) => {
    await db.collection("rooms").updateOne(
        {name: roomName},
        {
            $set: {players: {$elemMatch:{name: playerName, score: score}}}
        }
    )
}

module.exports = {
    addWords,
    findWords,
    deleteWords,
    updateWords,
    getRandomWords,
    getMP3,
    updatePlayerScores,
    createRoom,
    joinRoom,
    getRoom,
}