const express = require("express");
const mongoose = require("mongoose");

// Constants
const DB_STATUS = ['disconnected', 'connected', 'connecting', 'disconnecting']
const HOST = '0.0.0.0';
const PORT = 9000;

// DB connection
mongoose.connect(process.env.DB_URL);
mongoose.connection.on('connected', () => {
  console.log(`Mongoose is now connected to ${process.env.DB_URL}`)
});
mongoose.connection.on('disconnected', () => {
  console.log(`Mongoose is now disconnected.`)
});
mongoose.connection.on('error', () => {
  console.log(`Mongoose encountered an error on the connection.`)
});

// App initialization
const app = express();
app.get('/', (req, res) => {
  res.send(`<h1>Hello world</h1><p>DB connection status is <b>${DB_STATUS[mongoose.connection.readyState]}</b></p>`);
});
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`)
});