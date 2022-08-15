const {ObjectId} = require("mongodb");
const fs = require('fs');

const addWords = async (db, toInsert) => {
    const result =  await db.collection("words").insertMany(toInsert);
    console.log(`${result.insertedCount} new words added with ids: `);
}   

const deleteWords = async (db, toRemove) => {
    const result = await db.collection("words").deleteMany(toRemove);
    console.log(`${result.deletedCount} words deleted`);
} 

const getRandomWord = async (db) => {
    var cursor = (db.collection("words").aggregate([{ $sample: { size: 1 } }]));
    const word = (await cursor.toArray())[0];
    return word;
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

const updatePlayerScores = async (db, roomName, playerName, score) => {
    await db.collection("rooms").updateOne(
        {name: roomName},
        {
            $set: {players: {$elemMatch:{name: playerName, score: score}}}
        }
    )
}

const createRoom = async (db, roomName, hostName) => {
    const newRoom = {
        name: roomName,
        players: [
            {
            name: hostName,
            score: 0,
            }
        ],
        currentWordPosition: 0,
        words: [],
        // words: [
        //     "restaurant", "reliable"
        // ],
        attempts: [],
        // attempts: [
        //     ["resterant", "retaurent"],
        //     ["relable", "realable"]
        // ],
        settings: {
            time: 15,
            numberOfWords: 20,
        }
    }
    await db.collection("rooms").insertOne(newRoom);
} 

const joinRoom = async (db, roomName, player) => {
    const result = await db.collection("rooms").updateOne(
      {name: roomName},
      {
        $push: { players: player}
      }
    )
}

const getRoom = async (db, roomName) => {
    const result = await db.collection("rooms").find(
      {
        name: roomName
      }
    ).toArray();
    console.log(result[0].players)
  }

module.exports = {
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
}