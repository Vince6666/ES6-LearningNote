const Koa = require('koa')
const Router = require('koa-router')

let app = new Koa()
let router = new Router()


/**
 * params 形式的参数格式固定，必须符合 url 的要求
 * 这样的形式有利于SEO
 */
router.get('/user/:id1/:id2', async (ctx, next) => {
  let {id1, id2} = ctx.params
  console.log(ctx.params)

  ctx.body = 'aaa'

  await next()
})


/**
 * query 形式的参数不受 url 格式的限制，个数不限，也可以不传，比较灵活
 * 但是不利于 seo
 */
router.get('/user', async (ctx, next) => {
  let {a,b} = ctx.query
  console.log(ctx.query)

  ctx.body = 'bbb'

  await next()
})

app.use(router.routes())
app.listen(3000)