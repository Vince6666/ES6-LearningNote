const Koa = require('koa')
const app = new Koa()

// const main = ctx => {
//   ctx.throw(404)
// }


// app.on('error', (err, ctx) => {
//   console.log('server error', err)
// })

const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.type = 'html';
    ctx.response.body = '<p>Something wrong, please contact administrator.</p>';
    ctx.app.emit('error', err, ctx);  // 手动释放error事件
  }
};

const main = ctx => {
  ctx.throw(500);
};

app.on('error', function(err) {
  console.log('logging error ', err.message);
  console.log(err);
});

app.use(handler)
app.use(main)
app.listen(3000)