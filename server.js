// require express
const express = require('express')
const app = express()
const port = 8080

// require dotenv
require('dotenv').config()

// datavase gedeelte
// require mongodb
const { MongoClient } = require('mongodb')

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)
const db = client.db('mapsplore')
const coll = db.collection('maps')
const search = coll.find()

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static('static'))

// hiermee kan je het formulier versturen
app.use(express.urlencoded({ extended: true }))

// index page
app.get('/', function (req, res) {
  res.render('pages/index')
})

// All Maps page
const maps = [{
  name: 'waterVillage',
  url: '../images/waterVillage.png',
  year: 'future',
  season: 'summer',
  envoirement: 'sea',
  size: 'small'
},
{
  name: 'clayVillage',
  url: '../images/clayVillage.png',
  year: 'present',
  season: 'summer',
  envoirement: 'flat',
  size: 'medium'
},
{
  name: 'undergroundBase',
  url: '../images/undergroundBase.png',
  year: 'future',
  season: 'fall',
  envoirement: 'underground',
  size: 'medium'
},
{
  name: 'sandStorm',
  url: '../images/sandStorm.png',
  year: 'future',
  season: 'fall',
  envoirement: 'desert',
  size: 'big'
},
{
  name: 'rainForest',
  url: '../images/rainForest.png',
  year: 'past',
  season: 'summer',
  envoirement: 'forest',
  size: 'medium'
},
{
  name: 'desertVillage',
  url: '../images/desertVillage.png',
  year: 'past',
  season: 'summer',
  envoirement: 'desert',
  size: 'small'
},
{
  name: 'futureScape',
  url: '../images/futureScape.png',
  year: 'future',
  season: 'spring',
  envoirement: 'desert',
  size: 'big'
},
{
  name: 'snowLabs',
  url: '../images/snowLabs.png',
  year: 'future',
  season: 'winter',
  envoirement: 'mountains',
  size: 'big'
}

]

app.get('/all', function (req, res) {
  res.render('pages/all', {
    maps: maps
  })
})

// hier moeten gegevens uit de database komen

app.post('/results', function (req, res) {
  console.log(req.body)

  // db.maps.aggregate([{ $match: { year: req.year, season: req.season } } ])
  // [ { $match : { author: "dave" }}]
  // res.render('pages/results', {
  //   maps: maps
  // })
})

// functie die zoekt naar alle werelden in de database
async function showAllMaps () {
  try {
    await client.connect()
    console.log('Connected correctly to server')

    // const check = db.maps.find([{ $expr: { year: 'future' } }])
    // await search.forEach(check)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

showAllMaps().catch(console.dir)

app.listen(port)
console.log('Server is listening on port 8080')

// als je dit niet gebruitk kan het weg

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
