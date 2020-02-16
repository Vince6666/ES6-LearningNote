const Router = require('koa-router')
let admin = require('./admin')
let company = require('./company')

let router = new Router()

router.get('/', async (ctx) => {
  ctx.body = 'visit user'
})

router.use('/admin', admin)
router.use('/company', company)

module.exports=router.routes()