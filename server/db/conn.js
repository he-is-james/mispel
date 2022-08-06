const {MongoClient, ObjectId} = require("mongodb");
require('dotenv').config();

const uri = process.env.DB_URI;

const client = new MongoClient(uri);
let dbConn;

async function connectToDb(callback) {
    client.connect((err, db) => {
        if (err || !db) {
            return callback(err);
        }
        dbConn = db;
        console.log(`connected to db`);

        return callback();
    });
}

function getDb() {
    return dbConn;
}


module.exports = {
    connectToDb,
    getDb,
};