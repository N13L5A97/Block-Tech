const express = require('express')

const app = express()
const port = 3000

app.use(express.static('static'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/home/:user/' , (req, res) => {
  console.log('Input from' + req.params.user)
  res.send('<img src="/images/spiderman.png" width="150"> <h1>Hello ' + req.params.user + '</h1>')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

