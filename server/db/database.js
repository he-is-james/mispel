const {MongoClient} = require("mongodb");
const wordJSON = require("../../words/words.json");
const dotenv = require('dotenv');

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
    const docs = await db.collection("fat").find(toFind).toArray();
    console.log(docs.size + " words found");
    console.log(docs ? docs : "");
}

const updateWords = async (db, toUpdate, updateTo) => {
    const result = await db.collection("words").updateMany(toUpdate, [{$set: {word: updateTo}}]);
    console.log(`${result.modifiedCount} words updated`);
    return result
}

client = new MongoClient(uri);

client.connect()
    .then((db) => {
        dbo = db.db("test");
        // return addWords(dbo, toInsert).then(() => db);
        findWords(dbo, toFind)
        // return deleteWords(dbo, toDelete).then(() => db);
        // return updateWords(dbo, toUpdate).then(() => db);
    })
    .then((db) => {
        db.close();
        console.log("client closed");
    })
    .catch((err) => {
        console.log(err);
    })
