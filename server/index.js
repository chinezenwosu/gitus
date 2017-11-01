var express = require('express')
var path = require('path')
var app = express()
var port = 8080
require('dotenv').config();

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(process.env.PORT || port, function() {
  console.log('Listening on port', port)
})