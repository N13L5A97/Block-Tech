const express = require('express')
const app = express()
const port = 8080

require('dotenv').config()

const { MongoClient } = require('mongodb')

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)
const db = client.db('mapsplore')
const coll = db.collection('maps')

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static('static'))

app.use(express.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.render('pages/index')
})

app.get('/all', async (req, res) => {
  try {
    const maps = await coll.find().toArray()
    res.render('pages/all', { maps })
  } catch (err) {
    console.error(err)
    res.status(500).send('Error retrieving maps from database')
  }
})

app.post('/results', async function (req, res) {
  const { year, season, envoirement, size } = req.body

  try {
    const maps = await coll.find({
      year,
      season,
      envoirement,
      size
    }).toArray()

    if (maps.length === 0) {
      res.render('pages/no-matches')
    } else {
      res.render('pages/results', { maps })
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Error retrieving maps from database')
  }
})

app.listen(port)
console.log('Server is listening on port 8080')
