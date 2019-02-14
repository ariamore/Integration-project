const express = require('express')
const MongoClient = require('mongodb').MongoClient

// App initialization
const app = express()
app.use(require('./routes'))

// DB connection
MongoClient.connect(process.env.DB_URL, {useNewUrlParser: true})
.then(connection => {
  const db = connection.db(process.env.DB_NAME)
  console.log(`The connection to ${process.env.DB_NAME} was established successfully!`)
  app.locals.visit = db
  // Monitor connection
  db.on('close', () => console.log(`CLOSE event on ${db.databaseName}`))
  db.on('error', () => console.log(`ERROR event on ${db.databaseName}`))
  db.on('reconnect', () => console.log(`RECONNECT event on ${db.databaseName}`))
  db.on('timeout', () => console.log(`TIMEOUT event on ${db.databaseName}`))})
.catch(error => console.error(`An error ocurred during conection: ${error}`))

// Fire request listener
app.listen(process.env.WEB_PORT, () =>
  console.log(`Running on http://localhost:${process.env.WEB_PORT}`)
)
