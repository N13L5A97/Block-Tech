const express = require('express')
const app = express()
const port = 8080

// gebruik ejs als templating engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// static folder
app.use(express.static('static'))

// enable parsing of http request body
app.use(express.urlencoded({ extended: true }))

// zet geheime variabelen in .env bestand
require('dotenv').config()

// connect to MongoDB
const { MongoClient } = require('mongodb')
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

// maak variabelen voor de database en de collectie
const db = client.db('mapsplore')
const coll = db.collection('maps')

client.connect(err => {
  if (err) { throw err }
})

// home page
app.get('/', function (req, res) {
  res.render('pages/index')
})

// all maps page
app.get('/all', async (req, res) => {
  try {
    const maps = await coll.find().toArray()
    res.render('pages/all', { maps })
  } catch (err) {
    console.error(err)
    res.status(500).send('Error retrieving maps from database')
  }
})

// result page
app.post('/results', async (req, res) => {
  const { year, season, envoirement, size } = req.body
  // function to check the input and store it in an array
  try {
    const maps = await coll.find({
      year,
      season,
      envoirement,
      size
    }).toArray()

    if (maps.length === 0) {
      res.render('pages/404')
    } else {
      res.render('pages/results', { maps })
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Error retrieving maps from database')
  }
})

// 404 error page
app.use(function (req, res, next) {
  res.status(404).render('pages/404')
})

app.listen(port)
console.log('Server is listening on port 8080')

// gebruik crud 2x (create, read, update, delete)
// find = read
// insert = create
// update = update
// delete = delete
