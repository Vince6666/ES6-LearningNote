const express = require('express')
const bodyPsrser = require('body-parser')
let app = express()

// 创建 application/x-www-form-urlencoded 编码解析
let urlencodedParser = bodyPsrser.urlencoded({extended: false})


app.post('/process_post', urlencodedParser, function(req, res) {
  let response = {
    "first_name":req.body.first_name,
    "last_name":req.body.last_name
   };
   res.end(JSON.stringify(response));
})

let server = app.listen(8081, function() {
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})