const express = require('express');

const app = express();

const cors = require('cors');

const port = 5000;

app.use(cors());
app.use(require('./routes/rooms'));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
