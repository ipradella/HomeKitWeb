const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/inside', function (req, res) {
  res.send(18)
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})