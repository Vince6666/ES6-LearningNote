const http = require('http')
const url = require('url')
const fs = require('fs')

http.createServer(function(request, response) {

  let pathname = url.parse(request.url).pathname
  pathname = pathname.substr(1)
  console.log(pathname)
  
  fs.readFile(pathname, function(err, data){
    if(err) {
      console.log(err)
      response.writeHead(404, {'Content-Type': 'text/html'})
    } else {
      response.writeHead(200, {'Content-Type': 'text/html'})
      response.write(data.toString())
    }
    response.end()
  })


}).listen(8001)

console.log('Server is listening at 8000.')