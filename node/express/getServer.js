const express = require('express')
let app = express()

app.get('/process_get', function(req, res){

  let response = {
    "first_name": req.query.first_name,
    "last_name": req.query.last_name
  }

  res.end(JSON.stringify(response))

})

let server = app.listen(8001, function() {
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})