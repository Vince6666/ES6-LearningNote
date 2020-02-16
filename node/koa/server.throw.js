const Koa = require('koa')
const app = new Koa()

// const main = ctx => {
//   ctx.throw()     // 不写错误状态码时， 默认为 500
//   // 等效于 ctx.throw(500)
// }

// const main = ctx => {
//   ctx.response.status = 404
//   ctx.response.body = 'Page Not Found'
// }

const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
};

const main = ctx => {
  ctx.throw(500);
};

app.use(handler);
app.use(main);

// app.use(main)
app.listen(3000)