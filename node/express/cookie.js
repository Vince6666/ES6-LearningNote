const express = require('express')
const cookieParser = require('cookie-parser')
const util = require('util')

let app = express()

app.use(cookieParser())

app.get('/', function(req, res) {
  console.log("Cookies: " + util.inspect(req.cookies))

  res.
  
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'setCookies': 'user=vince'
  })

  res.end("cookie")
})

app.listen(8000)