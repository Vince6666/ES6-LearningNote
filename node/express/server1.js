const express = require('express')
const app = express()

app.get('/home/news/', function(req, res) {
  // res.send("hello")
  res.send(req.app)
  res.send(req.baseUrl)
  res.send(req.body)
  res.send(req.cookies)
  res.send(req.hostname)
  res.send(req.path)
  res.send(req.params)
  res.send(req.query)
  res.send(req.route)
})

let server = app.listen(8000, function() {
  let host = server.address().address
  let port = server.address().port

  console.log(host, port)
})