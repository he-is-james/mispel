const { MongoClient } = require("mongodb");
require('dotenv').config();

const uri = process.env.DB_URI;

function connect(url) {
    return MongoClient.connect(url).then(client => client.db('db'));
}

module.exports = async function() {
    const database = await Promise.resolve(connect(uri));
    return database;
}