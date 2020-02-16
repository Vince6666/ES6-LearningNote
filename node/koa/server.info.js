const Koa = require('koa')

let app = new Koa()

app.listen(3000)

app.use(async ctx => {
  console.log(ctx.request)
  console.log(ctx.response)
  ctx.body = 'end'
})