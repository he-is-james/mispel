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

const createRoom = async (db, newRoom) => {
    const result =  await db.collection("rooms").insertOne(newRoom);
    console.log(result.insertedId);
} 

const joinRoom = async (db, player) => {
    const result = await db.collection("rooms").updateOne(
      {name: 'test'},
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
    createRoom,
    joinRoom,
    getRoom,
}