const Koa = require('koa')
const Router = require('koa-router')

let app = new Koa()
let router = new Router()
app.listen(8888)

let admin = router.prefix('/admin');

console.log(admin instanceof Router); // true

admin.get('/:user', (ctx, next) => {
    ctx.body = 'admin user ' + ctx.params.user;
})

app.use(router.routes());
