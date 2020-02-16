const http = require('http')
const url = require('url')
const querystring = require('querystring')
const util = require('util')

http.createServer((request, response) => {
  // let params = url.parse(request.url).query
  // let json = qureystring.parse(params)
  // response.write('用户名：' + json.username)
  // response.write('密码：' + json.password)
  // let result = util.inspect(request, true, 4, true)

   // 定义了一个post变量，用于暂存请求体的信息
   var post = '';     
 
   // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
   request.on('data', function(chunk){    
       post += chunk;
   });

   // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
   request.on('end', function(){    
      post = querystring.parse(post);
        console.log(post)
      response.write('用户名：' + post.username)
      response.write('密码：' + post.password)
    
      // response.end(util.inspect(post));
      response.end()
   });
  
}).listen(8888)

console.log("server listening...")