const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');

dotenv.config()

// const URI = "mongodb+srv://root:uptheenergy@cluster0.rwdnjhm.mongodb.net/?retryWrites=true&w=majority"
const URI = process.env.DB_HOST;

console.log(URI)
const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var _db;

module.exports = {
  connectToServer: (callback) => {
    client.connect().then((db) => {
        if (db) {
            _db = db.db("test")
            console.log("Successfully connected to MongoDB."); 
        }
    }).catch(callback)
  },

  getDb: function () {
    return _db;
  },
};
// module.exports = {
//     connectToServer: (callback) => {
//         client.connect().then((db) => {
//             if (db) _db = db.db("test")
//             // console.log(_db.collection("fat").find({UR: "MOM"}))
//             // console.log("connected to db")
//         }).catch(callback)
//     },
//     getDB: () => {return _db}
// };

client.connect().then((db) => {
   fat = db.db("test").collection('fat')
   res = fat.find(MOM).toArray((err, result) => {
      if (err) throw err;
      return result;
   })
   return res;
}).catch(console.log)

// val.then(console.log)


