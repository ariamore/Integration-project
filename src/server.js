import express from 'express'
import { MongoClient } from 'mongodb'

import router from './routes'

// App initialization
const app = express()
app.use(router)

// DB connection
MongoClient.connect(process.env.DB_URL, {useNewUrlParser: true})
.then(connection => {
  const db = connection.db(process.env.DB_NAME)
  app.locals.visit = db.collection('visit')
  console.log(`The connection to ${process.env.DB_NAME} was established successfully!`)
  // Monitor connection state
  db.on('close', () => console.log(`CLOSE event on ${db.databaseName}`))
  db.on('error', () => console.log(`ERROR event on ${db.databaseName}`))
  db.on('reconnect', () => console.log(`RECONNECT event on ${db.databaseName}`))
  db.on('timeout', () => console.log(`TIMEOUT event on ${db.databaseName}`))})
.then(() => {
  // Fire request listener
  app.listen(process.env.WEB_PORT, () =>
    console.log(`Running on http://localhost:${process.env.WEB_PORT}`)
  )})
.catch(error => console.error('Error connecting to the DB', error))