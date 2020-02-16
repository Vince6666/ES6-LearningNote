const Koa = require('koa')
const session = require('koa-session')

let app = new Koa()
app.listen(8888)

app.keys = [
  'fdjasbkrabgrgaergnsjkg',
  'jsdfnbejwbkfvsbfjewneryu',
  'rieofbbdsbgefgmbefww'
]
/**
 * koa-session 本身是强制签名的
 */
app.use(session({ 
  maxAge: 600*1000,  // 有效期
  renew: true   // 自动续期
},app))

app.use(async ctx => {
  if(!ctx.session['view']) {
    ctx.session['view'] = 0
  }

  ctx.session['view']++

  ctx.body = `欢迎你第${ctx.session['view']}次来访！`
})
