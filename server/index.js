var express = require('express')
var app = express()
var port = 8080

app.get('/', function(req, res) {
  res.json({
    name: 'Chineze'
  })
})

app.listen(port, function() {
  console.log('Listening on port', port)
})