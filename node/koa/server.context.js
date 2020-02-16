const Koa = require('koa')
const Router = require('koa-router')

let app = new Koa()
let router = new Router()

app.context.msg = 'msg'

router.get('/login', (ctx, next) => {
  console.log(ctx.msg)

  /**
   * 当 value 条件不成立时，Helper 方法抛出类似于 .throw() 的错误。这与 node 的 assert() 方法类似.
   * ctx.assert(value, [status], [msg], [properties])
   */
  ctx.assert(ctx.query.user, 400, 'username is required')
  ctx.assert(ctx.query.pass, 400, 'password is required')

  // ctx.throw(400, username and password are required)

  ctx.body = 'logined'
})



app.use(router.routes())
app.listen(8000)