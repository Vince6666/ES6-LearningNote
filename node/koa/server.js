const Koa = require('koa')
const Router = require('koa-router')

let server = new Koa()
server.listen(8888)

let router = new Router()
// router.get('/a', async ctx => {
//   ctx.body = 'hello a'
// })

router.use('/user', require('./routers/user'))
router.use('/cart', require('./routers/cart'))

server.use(router.routes());
