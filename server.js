const express = require('express')
const app = express()
const port = 8080

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static('static'))

// use res.render to load up an ejs view file

// index page
app.get('/', function (req, res) {
  res.render('pages/index')
})

// All Maps page
app.get('/all', function (req, res) {
  res.render('pages/all')
  let games = [
    { name: 'Spider-man', img: '/images/spiderman.png' }, { name: 'sci-fi', img: '/images/sci-fi.jpeg' }
  ]
  var tagline = 'The Amazing Spiderman'

  res.render('pages/all', {
    games: games,
    tagline: tagline
  })
})

app.listen(port)
console.log('Server is listening on port 8080')
