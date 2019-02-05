const express = require("express");

// Constants
const HOST = '0.0.0.0';
const PORT = 9000;

// App
const app = express();
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>\n');
});

// app.listen(PORT, HOST);
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`)
});