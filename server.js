const express = require('express')
const app = express()
const port = 8080

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static('static'))

// hiermee kan je het formulier versturen
app.use(express.urlencoded({ extended: true }))

// datavase gedeelte
require('dotenv').config()
const { MongoClient } = require('mongodb')

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)
const db = client.db('mapsplore')
const coll = db.collection('maps')
const cursor = coll.find()

// index page
app.get('/', function (req, res) {
  res.render('pages/index')
})

// All Maps page
const games = [
  { name: 'Spider-man', img: '/images/spiderman.png' }, { name: 'sci-fi', img: '/images/sci-fi.jpeg' }
]

app.get('/all', function (req, res) {
  res.render('pages/all', {
    games: games
  })
})

// hier moeten gegevens uit de database komen
const world = {
}

app.post('/results', function (req, res) {
  console.log(req.body)
  res.render('pages/results', {
  world: world
  })
})

app.listen(port)
console.log('Server is listening on port 8080')

// test fetch api
// fetch('https://emojihub.yurace.pro/api/all')
//   .then(response => response.json())
//   .then(data => data.forEach(emoji => console.log(emoji.name)))
//   .catch(function (err) {
//     console.log('Error!', err)
//   })

// // datavase gedeelte
// require('dotenv').config()
// const { MongoClient } = require('mongodb')

// // Replace the uri string with your MongoDB deployment's connection string.
// const uri = process.env.MONGODB_URI
// const client = new MongoClient(uri)
// const db = client.db('mapsplore')
// const coll = db.collection('maps')
// const cursor = coll.find()

// data opvragen uit mapsplore database
// async function maps () {
//   try {
//     await client.connect()
//     console.log('Connected correctly to server')

//     const db = client.db('mapsplore')
//     const coll = db.collection('maps')
//     const cursor = coll.find()

//     await cursor.forEach(console.log)
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close()
//   }
// }

// maps().catch(console.dir)
