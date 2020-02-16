const Koa = require('koa')

const app = new Koa()
app.listen(8888)


const one = (ctx, next) => {
  console.log('>> one')
  next();
  console.log('<< one')
}

const two = (ctx, next) => {
  console.log('>> two')
  // next(); 
  console.log('<< two')
}

const three = (ctx, next) => {
  console.log('>> three')
  next();
  console.log('<< three')
}

app.use(one)
app.use(two)
app.use(three)