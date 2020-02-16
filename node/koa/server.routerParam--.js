const Koa = require('koa')
const Router = require('koa-router')

let app = new Koa()
let router = new Router()
app.listen(8888)

// const admin = router.prefix('/admin')

// admin
router
	.param('user', (id, ctx, next) => {   // ????
		ctx.user = user[id] || null
		if (!ctx.user) {
			return ctx.status = 404
		}
		// return next();
	})
	.get('/home/:user', (ctx, next) => {
		ctx.body = 'admin/home ' + ctx.params.user
	})
	.get('/about/:user', (ctx, next) => {
		ctx.body = 'admin/about ' + ctx.params.user
	})
	.get('/other/test', (ctx, next) => {
		// 没有 user 参数 所以 不经过 param('user') ctx.user 不存在
		ctx.body = 'admin/other/test ' + ctx.params.user
	})

app.use(router.routes())