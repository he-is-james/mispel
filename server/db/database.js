const {MongoClient, ObjectId} = require("mongodb");


const wordJSON = require("../../words/words.json");
const fs = require('fs')

const dotenv = require('dotenv');


console.log("hi");


dotenv.config();
const uri = process.env.DB_URI;

let toInsert = (wordJSON.words).map(x => {return {word: x}});
let toDelete = {};
let toFind = {};
let toUpdate = {};
let updateTo = "Shufat"

const addWords = async (db, toInsert) => {
    const result =  await db.collection("words").insertMany(toInsert);
    console.log(`${result.insertedCount} new words added with ids: `);
    console.log(result.insertedIds);
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

const addMP3 = async (db) => {
    var b64Str = fs.readFileSync('./output.mp3')
    const encoded = new Buffer.from(b64Str, 'base64')
    const document = {bytes: encoded }
    db.collection('fat').insertOne(document)
}

const getMP3 = async (db) => {
    const mp3 = await db.collection('fat').findOne({_id : ObjectId('62cb66b990eefb72169af51a')})
    const mp3File = new Buffer.from(mp3.value.buffer, 'base64')
    // fs.writeFileSync('output_copy.mp3', mp3File);
    return mp3File;
}


const getDb = async () => {
  return new MongoClient(uri);
}

export default all;

// client.connect()
//     .then((db) => {
//         console.log('hi')
//         dbo = db.db("test");
//         // addWords(db, ["test test"]);
//         // addMP3(dbo).then(() => db)
//         getMP3(dbo).then(() => db)
//     })
//     .then((db) => {
//         db.close();
//         console.log("client closed");
//     })
//     .catch((err) => {
//         console.log(err);
//     })
