require('dotenv').config()
const { MongoClient } = require('mongodb')

// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

// data opvragen uit mapsplore database
async function maps () {
  try {
    await client.connect()
    console.log('Connected correctly to server')

    const db = client.db('mapsplore')
    const coll = db.collection('maps')
    const cursor = coll.find()

    await cursor.forEach(console.log)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

maps().catch(console.dir)

// data versturen naar database
// async function input () {
//   try {
//     await client.connect()
//     console.log('Connected correctly to server')

//     const db = client.db('mapsplore')
//     const coll = db.collection('maps')

//     // await coll.insertOne(bestand1)

//     // find code goes here
//     const cursor = coll.find()

//     // iterate code goes here
//     await cursor.forEach(console.log)
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close()
//   }
// }

// input().catch(console.dir)

// const bestand1 = {
//   title: 'The Favourite',
//   genres: ['Drama', 'History'],
//   runtime: 121,
//   rated: 'R',
//   year: 2018,
//   directors: ['Yorgos Lanthimos'],
//   cast: ['Olivia Colman', 'Emma Stone', 'Rachel Weisz'],
//   type: 'movie'
// }

// data opvragen uit database

// async function run () {
//   try {
//     await client.connect()
//     // database and collection code goes here
//     const db = client.db('sample_guides')
//     const coll = db.collection('planets')

//     // find code goes here
//     const cursor = coll.find()

//     // iterate code goes here
//     await cursor.forEach(console.log)
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close()
//   }
// }
// run().catch(console.dir)
