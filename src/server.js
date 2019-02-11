const express = require('express')
const MongoClient = require('mongodb').MongoClient

// App initialization
const app = express()

// DB connection
MongoClient.connect(process.env.DB_URL, { reconnectInterval: 500, reconnectTries: 3, useNewUrlParser: true})
.then(connection => {
  const db = connection.db(process.env.DB_NAME)
  console.log(`The connection to ${process.env.DB_NAME} was established successfully!`)
  app.locals.visit = db.collection('visit')
  // Monitor connection
  db.on('close', () => console.log(`CLOSE event on ${db.databaseName}`))
  db.on('error', () => console.log(`ERROR event on ${db.databaseName}`))
  db.on('reconnect', () => console.log(`RECONNECT event on ${db.databaseName}`))
  db.on('timeout', () => console.log(`TIMEOUT event on ${db.databaseName}`))})
.catch(error => console.error(`An error ocurred during conection: ${error}`))

// Routing
app.get('/', (req, res) => {
  // Get current timestamp
  const curr_time_iso = new Date().toISOString()
  // Retrieve most recent visits
  req.app.locals.visit.find({}, {'timestamp': 1}).sort({timestamp: -1}).limit(5).toArray()
  .then(last_visits => res.send(`
    <h1>Welcome to this site!</h1>
    <h3>Most recent visits:</h3>
    <ol>${last_visits.length
          ? last_visits.map(v => `<li>${v.timestamp}</li>`).join('')
          : `<li>This is the first visit ever!</li>`}</ol>`))
  .catch(error => console.error(error))
  // Insert new visit
  req.app.locals.visit.insertOne({timestamp: curr_time_iso})
  .catch(error => console.error(error))
})

// Fire request listener
app.listen(process.env.WEB_PORT, () =>
  console.log(`Running on http://localhost:${process.env.WEB_PORT}`)
)