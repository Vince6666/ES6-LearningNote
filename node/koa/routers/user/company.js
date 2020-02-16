const Router = require('koa-router')

let router = new Router()

router.get('/', ctx => {
  ctx.body = 'visit user/company'
})

module.exports=router.routes()