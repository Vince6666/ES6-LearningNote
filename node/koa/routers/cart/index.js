const Router = require('koa-router')

let router = new Router()

router.get('/', ctx => {
  ctx.body = 'visit cart'
})

module.exports=router.routes()