const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')

let app = new Koa()

let staticRouter = new Router()

/**
 * all() 方法表示所有请求都会经过这里
 * 第一个参数是匹配可以是正则，匹配相关的文件
 * 第二个参数表示如果前面符合匹配，就调用 static(), 访问 './static' 目录
 */
staticRouter.all(/(\.jpg|\.png|\.gif)$/i, static('./static', {
  maxage: 3600*1000
}))
staticRouter.all(/(\.html|\.htm|\.shtml)$/i, static('./static', {
  maxage: 6400*1000
}))

app.use(staticRouter.routes())


app.listen(3001)