const Koa = require('koa')

let app = new Koa()
app.listen(8888)

app.keys = [
  'fdjasbkrabgrgaergnsjkg',
  'jsdfnbejwbkfvsbfjewneryu',
  'rieofbbdsbgefgmbefww'
]

app.use(async ctx => {
  ctx.cookies.set('user', 'vince', {
    signed: true   // 设置签名
  })

  // console.log(ctx.cookies.get('user'))
  console.log(ctx.cookies.get('user', {signed: true}))  // 读取时也需要设置，若不设置，客户端可以随意篡改cookie
  
  ctx.body = 'cookie'
})
