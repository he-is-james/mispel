import * as funcs from "db/database.js";


const express = require('express');



const app = express();

const cors = require('cors');

const port = 5000;

app.use(cors());
app.use(require('./routes/rooms'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.get("/api/getSound", (req, res) => {
  funcs.getDb().then((client) => {
    client.connect().then((db) => {
      const dbo = db.db(test);
      funcs.getMP3(dbo).then(buffer => {
        res.send(buffer);
      }).then(() => db)
    }).then((db) => db.close())
  })
})
