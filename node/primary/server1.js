const url = require('url')
const http = require('http')

function start(route) {

  // 处理请求
  function onRequest(req, res) {
    let pathname = url.parse(req.url).pathname

    route(pathname)

    res.writeHeader(200, {'Content-Type': 'text/plain'})
    res.write('Hello')
    res.end()
  }
  
  // 创建服务
  let server = http.createServer(onRequest)
  server.listen(8888)
  console.log("Server has started.")
}

module.exports = start;
