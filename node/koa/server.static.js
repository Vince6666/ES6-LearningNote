const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')

let app = new Koa()
let router = new Router()

router.get('/user', async ctx => {
  // console.log(ctx.url)
  // ctx.body = 'user'
})
app.use(router.routes())

app.use(static('./static', {
  maxage: 600*1000,  // 缓存时间
  index: '1.html'  // 默认文件
}))

app.listen(3001)