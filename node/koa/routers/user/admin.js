const Router = require('koa-router')

let router = new Router()

router.get('/', ctx => {
  ctx.body = 'visit user/admin'
})

module.exports=router.routes()