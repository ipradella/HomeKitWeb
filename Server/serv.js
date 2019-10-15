const express = require('express')
// const sqlite3 = require('sqlite3').verbose();
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/temperature/inside', function (req, res) {
  res.send('18')
})

app.get('/temperature/outside', function (req, res) {
  res.send('12')
})

app.get('/temperature/desired', function (req, res) {
  res.send('20')
})


app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})