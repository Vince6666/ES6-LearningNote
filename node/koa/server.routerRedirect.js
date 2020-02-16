const Koa = require('koa')
const Router = require('koa-router')

let app = new Koa()
let router = new Router()
app.listen(8888)

const admin = router.prefix('/admin')

admin.get('/:user/:id', (ctx, next) => {
    ctx.body = 'admin user ' + ctx.params.user + ' id ' + ctx.params.id;
    next();
})

 // 目的地地址要写全称，包含前缀
admin.redirect('/default/:id', '/admin/test', 303);

admin.get('/test', (ctx) => {
    ctx.body = 'in /admin/test';
})

app.use(router.routes())