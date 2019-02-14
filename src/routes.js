// Routes definition
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
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
  // Log success
  if(process.env.POD_IP && process.env.POD_NAME)
    console.log(`Visit recorded at ${curr_time_iso} by POD ${process.env.POD_NAME} @ ${process.env.POD_IP}`)
  else
    console.log(`Visit recorded at ${curr_time_iso}`)
})

router.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    timestamp: new Date().toISOString()})
})


module.exports = router