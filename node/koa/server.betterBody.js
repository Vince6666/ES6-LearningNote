const Koa = require('koa')
const betterBody = require('koa-better-body')

let app = new Koa()

app.use(betterBody({
  uploadDir: './static/uploads'  // 上传目录
}))

app.use(async ctx => {
  // 文件和 post 数据
  console.log(ctx.request.fields)   //请求的表单域
  // console.log(ctx.request.files)

  ctx.body = 'success'

})


app.listen(3001)