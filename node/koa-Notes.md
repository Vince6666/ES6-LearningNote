# Koa 笔记  

- [Koa 笔记](#koa-笔记)
  - [1. Koa API](#1-koa-api)
    - [1.1 Koa Application](#11-koa-application)
      - [app 应用对象的属性](#app-应用对象的属性)
      - [app.listen()](#applisten)
      - [app.callback()](#appcallback)
      - [app.use(function)](#appusefunction)
      - [app.keys](#appkeys)
      - [app.context](#appcontext)
    - [1.2 Context 上下文](#12-context-上下文)
      - [ctx 对象](#ctx-对象)
      - [ctx 的属性和方法](#ctx-的属性和方法)
      - [HTTP Response 的类型](#http-response-的类型)
      - [网页模板](#网页模板)
    - [1.3 Request 请求](#13-request-请求)
      - [API](#api)
      - [内容协商](#内容协商)
    - [1.4 Response 响应](#14-response-响应)
      - [API](#api-1)
  - [2. Koa Router 路由](#2-koa-router-路由)
    - [2.1 安装路由](#21-安装路由)
    - [2.2 使用路由](#22-使用路由)
    - [2.3 匹配 http 请求的方法](#23-匹配-http-请求的方法)
    - [2.4 嵌套路由](#24-嵌套路由)
    - [2.5 路由 API](#25-路由-api)
      - [router.routes()](#routerroutes)
      - [router.allowedMethods([options])](#routerallowedmethodsoptions)
      - [router.use([path], middleware)](#routerusepath-middleware)
      - [router.prefix(prefix)](#routerprefixprefix)
      - [router.redirect(source, destination, code)](#routerredirectsource-destination-code)
      - [router.param(param, middleware)](#routerparamparam-middleware)
  - [3. Middleware 中间件](#3-middleware-中间件)
    - [3.1 中间件的概念](#31-中间件的概念)
    - [3.2 中间件栈（middle stack）](#32-中间件栈middle-stack)
    - [3.3 异步中间件](#33-异步中间件)
  - [4. 错误处理](#4-错误处理)
    - [4.1 500 错误](#41-500-错误)
    - [4.2 404错误](#42-404错误)
    - [4.3 处理错误的中间件](#43-处理错误的中间件)
    - [4.4 error 事件的监听](#44-error-事件的监听)
    - [4.5 释放 error 事件](#45-释放-error-事件)

## 1. Koa API  

### 1.1 Koa Application  

在执行 <code>new Koa()</code> 时创建的对象被称为 Koa 应用对象。  

```javascript
let app = new Koa()
```

应用对象是带有 node http 服务的 Koa 接口，它可以处理中间件的注册，将 http 请求分发到中间件，进行默认错误处理，以及对应山下文，请求和响应对象进行配置。  

#### app 应用对象的属性  

  1. <code>app.env</code> 默认是 NODE_ENV 的值或者 "development"  
  2. <code>app.proxy</code> 当真正的代理头字段被信任时，设置为 true 时支持 X-Forwarded-Host 可以使用代理中的地址信息  
  3. <code>app.subdomainOffset</code> 用于设置子域名的偏移值，默认为 2  

#### app.listen()  

<code>listen()</code> 方法只是在内部通过 <code>http.createServer()</code> 创建并返回一个 **服务器**，给定的参数都会传递给创建的 <code>server.listen(...args)</code> 开启 HTTP 服务。

一个无作用的 Koa 应用程序被绑定到 8080 端口:  

```javascript
const Koa = require('koa')
const app = new Koa()
app.listen(8000)
```

这里的 app.listen(...) 方法只是以下方法的语法糖:  

```javascript
const http = require('http')
const Koa = require('koa')
const app = new Koa()
http.createServer(app.callback()).listen(8000)
```  

#### app.callback()  

返回适用于 <code>http.createServer()</code> 方法的回调函数来处理请求。你也可以使用此回调函数将 koa 应用程序挂载到 Connect/Express 应用程序中。  

#### app.use(function)  

用来加载中间件，Koa 所有的功能都是通过中间件实现的, 该方法将给定的中间件方法添加到 app 应用程序。  

#### app.keys  

设置签名的 Cookie 密钥。  

```javascript
// app.keys 设置签名的 Cookie 秘钥
app.keys = ['im a newer secret', 'i like turtle']

app.use(async ctx => {
  ctx.cookies.set('user', 'vince', {
    signed: true   // 设置签名
  })

  // console.log(ctx.cookies.get('user'))
  console.log(ctx.cookies.get('user', {signed: true}))  // 读取时也需要设置，若不设置，客户端可以随意篡改cookie
})
```
#### app.context  

<code>app.context</code> 是从其创建 ctx 的**原型**。您可以通过编辑 <code>app.context</code> 为 ctx 添加其他属性。  

例如，要从 ctx 添加对数据库的引用：  

```javascript
app.context.db = db()

app.use(async ctx => {
  console.log(ctx.db)
})
```

### 1.2 Context 上下文  

#### ctx 对象  

Koa Context 将 node 的 `request` 和 `response` 对象封装到单个对象中，为编写 Web 应用程序和 API 提供了许多有用的方法。   

每个请求都将创建一个 Context，并在中间件中作为接收器引用，或者 ctx 标识符：  

```javascript
app.use(async ctx => {
  ctx           // 这是 Context
  ctx.request   // 这是 HTTP Request
  ctx.response  // 这是 HTTP Response
  ctx.response.body = 'Hello World'  // 这是发送给客户端的内容
})
```

为了方便起见许多上下文的访问器和方法直接委托给它们的 <code>ctx.request</code> 或 <code>ctx.response</code> 。例如 ctx.type 和 ctx.length 委托给 response 对象，ctx.path 和 ctx.method 委托给 request。  

#### ctx 的属性和方法  

1. <code>ctx.req</code> Node 的 request 对象

2. <code>ctx.res</code> Node 的 response 对象

3. <code>ctx.request</code> Koa 的 request 对象

4. <code>ctx.response</code> Koa 的 response 对象

5. <code>ctx.app</code> 应用程序实例引用

6. <code>ctx.app.emit</code> 发出一个类型由第一个参数定义的事件

7.  <code>ctx.cookies.get(name, [options])</code> 获取名为 name 的 cookie，options 为选项配置，其中的 signed 为 true 时表示所请求的 cookie 应该被签名  

8. <code>ctx.cookies.set(name, value, [options])</code> 通过 name 和 value 设置 cookie。  options 有以下以下选项：
    - <code>maxAge </code> 表示有效期的毫秒数
    - <code>signed </code> 是否签名
    - <code>expires </code> cookie 过期的时间
    - <code>domain </code> cookie 的域名
    - <code>path </code> cookie 路径，默认是 '/'
    - <code>httpOnly </code> 服务器可访问 cookie, 默认是 true 

9. <code>ctx.throw([status], [msg], [properties])</code> 抛出一个 .status 属性默认为 500 的错误，这将允许 Koa 做出适当地响应。  
    - status 是错误状态码
    - msg 是描述信息
    - properties 可以设置 error 的其他属性  

```javascript
ctx.throw(400, 'name required', { user: user })

ctx.throw(400, 'name required')
// 等效于：
const err = new Error('name required')
err.status = 400
err.expose = true
throw err
```

10. <code>ctx.assert(value, [status], [msg], [properties])</code> 断言，当 value 条件不成立时，抛出类似于 .throw() 的错误  

#### HTTP Response 的类型  

Koa 默认的返回类型是 <code>text/plain</code> ，如果想返回其他类型的内容，可以先用 <code>ctx.request.accepts()</code>判断一下，客户端希望接受什么数据（根据 HTTP Request 的Accept字段），然后使用 <code>ctx.response.type</code>指定返回类型。  

```javascript
const main = ctx => {
  if (ctx.request.accepts('xml')) {
    ctx.response.type = 'xml';
    ctx.response.body = '<data>Hello World</data>';
  } else if (ctx.request.accepts('json')) {
    ctx.response.type = 'json';
    ctx.response.body = { data: 'Hello World' };
  } else if (ctx.request.accepts('html')) {
    ctx.response.type = 'html';
    ctx.response.body = '<p>Hello World</p>';
  } else {
    ctx.response.type = 'text';
    ctx.response.body = 'Hello World';
  }
}
```

访问 http://localhost:3000/，现在看到的就是一个 XML 文档了。

#### 网页模板  

实际开发中，返回给用户的网页往往都写成模板文件。我们可以让 Koa 先读取模板文件，然后将这个模板返回给用户。  

```javascript
const fs = require('fs')
const Koa = require('koa')
const app = new Koa()

const main = async function (ctx, next) {
  ctx.response.type = 'html'
  ctx.response.body = await fs.createReadStream('./template.html', 'utf8')
};

app.use(main)
app.listen(3000)
```

访问 http://localhost:3000/，就能显示 template.html 的内容了。  

### 1.3 Request 请求  

#### API

1. <code>request.header</code> 获取/设置请求标头对象。

2. **<code>request.headers</code>** 请求标头对象。别名为 request.header.

3. **<code>request.method</code>** 设置请求方法，对于实现诸如 methodOverride() 的中间件是有用的。

4. <code>request.length</code> 返回以数字返回请求的 Content-Length，或 undefined。

5. **<code>request.url</code>** 获取/设置请求 URL, 对 url 重写有用。

6. <code>request.originalUrl</code> 获取请求原始URL。

7. <code>request.origin</code> 获取URL的来源，包括 protocol 和 host。

```javascript
ctx.request.origin
// => http://example.com
```

8. <code>request.href</code> 获取完整的请求URL，包括 protocol，host 和 url。

```javascript
ctx.request.href;
// => http://example.com/foo/bar?q=1
```


9. <code>request.socket</code> 返回请求套接字。

10. <code>request.get(field)</code> 返回请求标头。

11. **<code>request.path</code>** 获取/设置请求路径名，并在存在时保留查询字符串。

12. **<code>request.query</code>** 获取解析的查询字符串, 当没有查询字符串时，返回一个空对象。请注意，此 getter 不 支持嵌套解析。

例如 "color=blue&size=small":  

```javascript
{
  color: 'blue',
  size: 'small'
}
```

13. <code>request.query=</code> 将查询字符串设置为给定对象。 请注意，此 setter 不 支持嵌套对象。

```javascript
ctx.query = { next: '/login' }
```

14. **<code>request.querystring</code>** 根据 ? 获取原始查询字符串.

15. <code>request.host</code> 获取当前主机（hostname:port）。当 app.proxy 是 true 时支持 X-Forwarded-Host，否则使用 Host。


16. <code>request.URL</code> 获取 WHATWG 解析的 URL 对象。

17. **<code>request.type</code>** 获取请求 Content-Type 不含参数 "charset"。

```javascript
const ct = ctx.request.type
// => "image/png"
``` 

18. <code>request.charset</code> 在存在时获取请求字符集，或者 undefined：

```javascript
ctx.request.charset
// => "utf-8"
```

19. **<code>request.fresh</code>** 检查请求缓存是否“新鲜”，也就是内容没有改变。  
此方法用于 <code>If-None-Match / ETag</code> 和 <code>If-Modified-Since</code> 和 <code>Last-Modified</code> 之间的缓存协商。 在设置一个或多个这些响应头后应该引用它。

```javascript
// 新鲜度检查需要状态 20x 或 304
ctx.status = 200
ctx.set('ETag', '123')

// 缓存是好的, 不需要返回数据
if (ctx.fresh) {
  ctx.status = 304
  return
}

// 缓存是陈旧的，获取新数据并返回
ctx.body = await db.find('something');
```

20. <code>request.stale </code> 与 <code>request.fresh</code> 相反

21. <code>request.protocol</code> 返回请求协议，“https” 或 “http”。当 app.proxy 是 true 时支持 X-Forwarded-Proto。

22. <code>request.secure</code> 通过 ctx.protocol == "https" 来检查请求是否通过 TLS 发出。

23. <code>request.ip</code> 请求远程地址。 当 app.proxy 是 true 时支持 X-Forwarded-Proto。


24. <code>request.subdomains</code> 将子域返回为数组。**子域是指应用程序主域之前主机的点分隔部分。**  

默认情况下，应用程序的域名假定为主机的最后两个部分。这可以通过设置 app.subdomainOffset (设置子域名的偏移值，默认情况下为2) 来更改。

例如，如果域名为 “tobi.ferrets.example.com”:  

- 如果 app.subdomainOffset 未设置 (默认 2), ctx.subdomains 是 ["ferrets", "tobi"].   
- 如果 app.subdomainOffset 是 3, ctx.subdomains 是 ["tobi"].

25. <code>request.is(types...)</code> 检查传入请求是否包含 Content-Type 头字段， 并且包含任意的 mime type。 如果没有请求主体，返回 null。 如果没有内容类型，或者匹配失败，则返回 false。 反之则返回匹配的 content-type。

```javascript
// 使用 Content-Type: text/html; charset=utf-8
ctx.is('html') // => 'html'
ctx.is('text/html') // => 'text/html'
ctx.is('text/*', 'text/html') // => 'text/html'

// 当 Content-Type 是 application/json 时
ctx.is('json', 'urlencoded') // => 'json'
ctx.is('application/json') // => 'application/json'
ctx.is('html', 'application/*') // => 'application/json'

ctx.is('html') // => false
```

例如，如果要确保仅将图像发送到给定路由：

```javascript
if (ctx.is('image/*')) {
  // 处理
} else {
  ctx.throw(415, 'images only!')
}
```

#### 内容协商  

Koa 的 request 对象包括由 accepts 和 negotiator 提供的有用的内容协商实体。

这些实用程序是：

- request.accepts(types)
- request.acceptsEncodings(types)
- request.acceptsCharsets(charsets)
- request.acceptsLanguages(langs)

如果没有提供类型，则返回 所有 可接受的类型。

如果提供多种类型，将返回最佳匹配。 如果没有找到匹配项，则返回一个false，你应该向客户端发送一个406 "Not Acceptable" 响应。

如果接收到任何类型的接收头，则会返回第一个类型。 因此，你提供的类型的顺序很重要。

例：

**<code>request.accepts(types)</code>**：  

检查给定的 type(s) 是否可以接受，如果 true，返回最佳匹配，否则为 false。 type 值可能是一个或多个 mime 类型的字符串，如 application/json，扩展名称如 json，或数组 ["json", "html", "text/plain"]。

```javascript
// Accept: text/html
ctx.accepts('html')
// => "html"

// Accept: text/*, application/json
ctx.accepts('html')
// => "html"
ctx.accepts('text/html')
// => "text/html"
ctx.accepts('json', 'text')
// => "json"
ctx.accepts('application/json')
// => "application/json"

// Accept: text/*, application/json
ctx.accepts('image/png')
ctx.accepts('png')
// => false

// Accept: text/*;q=.5, application/json
ctx.accepts(['html', 'json'])
ctx.accepts('html', 'json')
// => "json"

// No Accept header
ctx.accepts('html', 'json')
// => "html"
ctx.accepts('json', 'html')
// => "json"
```

你可以根据需要多次调用 ctx.accepts()，或使用 switch：

```javascript
switch (ctx.accepts('json', 'html', 'text')) {
  case 'json': break
  case 'html': break
  case 'text': break
  default: ctx.throw(406, 'json, html, or text only')
}
```

### 1.4 Response 响应 

#### API  

1. <code>response.header</code> 响应标头对象。

2. **<code>response.headers</code>** 响应标头对象。别名是 <code>response.header</code>。

3. <code>response.socket</code> 响应套接字。

4. **<code>response.status</code>** 获取响应状态。默认情况下，<code>response.status</code> 设置为 404 而不是像 node 的 <code>res.statusCode</code> 那样默认为 200。

5. **<code>response.status=</code>** 通过数字代码设置响应状态：

- 101 "switching protocols"
- 200 "ok"
- 204 "no content"
- 300 "multiple choices"
- 301 "moved permanently"
- 302 "found"
- 303 "see other"
- 304 "not modified"
- 305 "use proxy"
- 307 "temporary redirect"
- 308 "permanent redirect"
- 400 "bad request"
- 403 "forbidden"
- 404 "not found"
- 500 "internal server error"
- 501 "not implemented"
- 502 "bad gateway"
- 503 "service unavailable"  

6. <code>response.message</code> 获取响应的状态消息. 默认情况下, <code>response.message</code> 与 <code>response.status</code> 关联.

7. <code>response.message=</code> 将响应的状态消息设置为给定值。

8. <code>response.length=</code>  将响应的 Content-Length 设置为给定值。

9. <code>response.length</code> 以数字返回响应的 Content-Length，或者从 ctx.body 推导出来，或者 undefined。

10. **<code>response.body</code>** 获取响应主体。

11. **<code>response.body=</code>** 将响应体设置为以下之一：

- string 写入
- Buffer 写入
- Stream 管道
- Object || Array JSON-字符串化
- null 无内容响应  

如果 <code>response.status</code> 未被设置, Koa 将会自动设置状态为 200 或 204。

Koa 没有防范作为响应体的所有内容 - 函数没有有意义地序列化，返回布尔值可能会根据您的应用程序而有意义。并且当错误生效时，它可能无法正常工作 错误的属性无法枚举。 我们建议在您的应用中添加中间件，以确定每个应用的正文类型。  
示例中间件可能是：

```javascript
app.use(async (ctx, next) => {
  await next()

  ctx.assert.equal('object', typeof ctx, 500, '某些开发错误')
})
```

**String**  

Content-Type 默认为 <code>text/html</code> 或 <code>text/plain</code> , 同时默认字符集是 <code>utf-8</code>。Content-Length 字段也是如此。

**Buffer**  

Content-Type 默认为 <code>application/octet-stream</code> , 并且 Content-Length 字段也是如此。

**Stream**  

Content-Type 默认为 <code>application/octet-stream</code>。

每当流被设置为响应主体时，**.onerror** 作为侦听器自动添加到 error 事件中以捕获任何错误。此外，每当请求关闭（甚至过早）时，流都将被销毁。如果你不想要这两个功能，请勿直接将流设为主体。  
例如，当将主体设置为代理中的 HTTP 流时，你可能不想要这样做，因为它会破坏底层连接。


以下是流错误处理的示例，而不会自动破坏流：

```javascript
const PassThrough = require('stream').PassThrough

app.use(async ctx => {
  ctx.body = someHTTPStream.on('error', ctx.onerror).pipe(PassThrough())
})
```

**Object**  

Content-Type 默认为 <code>application/json</code>. 这包括普通的对象 { foo: 'bar' } 和数组 ['foo', 'bar']。  

12. **<code>response.get(field)</code>** 不区分大小写获取响应标头字段值 field。

```javascript
const etag = ctx.response.get('ETag')
```

13. **<code>response.set(field, value)</code>** 设置响应标头 field 到 value:

```javascript
ctx.set('Cache-Control', 'no-cache')
```

14. <code>response.append(field, value)</code> 用值 val 附加额外的标头 field。

```javascript
ctx.append('Link', '<http://127.0.0.1/>')
```

15. **<code>response.set(fields)</code>** 用一个对象设置多个响应标头fields:

```javascript
ctx.set({
  'Etag': '1234',
  'Last-Modified': date
})
```

这将委托给 setHeader ，它通过指定的键设置或更新标头，并且不重置整个标头。

16. <code>response.remove(field)</code> 删除标头 field。

17. <code>response.type</code> 获取响应 Content-Type 不含参数 "charset"。

```javascript
const ct = ctx.type
// => "image/png"
```

18. <code>response.type=</code> 设置响应 Content-Type 通过 mime 字符串或文件扩展名。

```javascript
ctx.type = 'text/plain; charset=utf-8';
ctx.type = 'image/png';
ctx.type = '.png';
ctx.type = 'png';
```

注意: 在适当的情况下为你选择 charset, 比如 <code>response.type = 'html'</code>将默认是 "utf-8"。如果你想覆盖 charset, 使用 <code>ctx.set('Content-Type', 'text/html')</code> 将响应头字段设置为直接值。

19. <code>response.is(types...)</code> 非常类似 <code>ctx.request.is()</code>. 检查响应类型是否是所提供的类型之一。这对于创建操纵响应的中间件特别有用。

例如, 这是一个中间件，可以削减除流之外的所有 HTML 响应。

```javascript
const minify = require('html-minifier');

app.use(async (ctx, next) => {
  await next();

  if (!ctx.response.is('html')) return;

  let body = ctx.body;
  if (!body || body.pipe) return;

  if (Buffer.isBuffer(body)) body = body.toString();
  ctx.body = minify(body);
});
```

20. **<code>response.redirect(url, [alt])</code>** 执行 [302] 重定向到 url.

字符串 “back” 是特别提供 Referrer 支持的，当 Referrer 不存在时，使用 alt 或 “/”。

```javascript
ctx.redirect('back');
ctx.redirect('back', '/index.html');
ctx.redirect('/login');
ctx.redirect('http://google.com');
```

要更改 “302” 的默认状态，只需在该调用之前或之后分配状态。要变更主体请在此调用之后:

```javascript
ctx.status = 301;
ctx.redirect('/cart');
ctx.body = 'Redirecting to shopping cart';
```

21. <code>response.attachment([filename], [options])</code> 将 Content-Disposition 设置为 “附件” 以指示客户端提示下载。(可选)指定下载的 filename 和部分 参数。

22. <code>response.headerSent</code> 检查是否已经发送了一个响应头。 用于查看客户端是否可能会收到错误通知。

23. <code>response.lastModified</code> 将 Last-Modified 标头返回为 Date, 如果存在。

24. <code>response.lastModified=</code> 将 Last-Modified 标头设置为适当的 UTC 字符串。您可以将其设置为 Date 或日期字符串。

```javascript
ctx.response.lastModified = new Date();
```

25. <code>response.etag=</code> 设置包含 " 包裹的 ETag 响应， 请注意，没有相应的 response.etag getter。

```javascript
ctx.response.etag = crypto.createHash('md5').update(ctx.body).digest('hex');
```

26. <code>response.vary(field)</code> 在 field 上变化。

27. <code>response.flushHeaders()</code> 刷新任何设置的标头，并开始主体。

<br>

## 2. Koa Router 路由

### 2.1 安装路由  

koa 的路由需要使用中间件 <code>koa-router</code>  
    
    npm install koa-router -S  

### 2.2 使用路由

一般用法：

```javascript
const Koa = require('koa')
const Router = require('koa-router')

let app = new Koa()
let router = new Router()  // 创建 router 实例

// 匹配 get 方法，请求路径为 '/admin'
router.get('/admin', async (ctx, next) => {
  ctx.body = 'admin page'
  await next()
})

// 加载 router 中间件
app.use(router.routes())

app.listen(8888)
```

### 2.3 匹配 http 请求的方法  

router 实例可以匹配的 http 请求的方法有：  

- get
- post
- put
- patch
- del
- delete  
......  

此外，<code>router.all()</code> 方法可以匹配所有的 http 请求方法。

```javascript
router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!'
  })
  .post('/users', (ctx, next) => {
    // ...
  })
  .put('/users/:id', (ctx, next) => {
    // ...
  })
  .del('/users/:id', (ctx, next) => {
    // ...
  })
  .all('/users/:id', (ctx, next) => {
    // ...
  })
```

### 2.4 嵌套路由  

```javascript
// ...
const app = new Koa()
const router = new Router()
const admin = new Router()

router.get('/home/', (ctx, next) => {
  // ....
})

admin.get('/user/', (ctx, next) => {
  // ....
})

// 路由嵌套, admin 嵌套在 router 中
router.use('/admin', admin.routes()) 

app.use(router.routes())
```

### 2.5 路由 API  

#### router.routes() 

返回一个中间件，这个中间件根据请求分派路由  

#### router.allowedMethods([options])  

根据不同类型（也就是 options 参数）的请求允许请求头包含的方法，返回不同的中间件，以及响应 **405 [不被允许]** 和 **501 [未实现]**  

#### router.use([path], middleware)  

在路由中使用中间件，中间件运行的顺序是 **.use()** 方法调用的顺序。  
path 允许调用中间件的路径，可以是一个路径字符串，也可以是路径组成的数组，不设置表示所有路径都可以使用。  

#### router.prefix(prefix)  

返回一个子路由，这个路由挂载在 router 上，并且设置了 prefix 前缀。 

```javascript
const Koa = require('koa')
const Router = require('koa-router')

let app = new Koa()
let router = new Router()
app.listen(8888)

let admin = router.prefix('/admin')

console.log(admin instanceof Router) // true

admin.get('/:user', (ctx, next) => {
    ctx.body = 'admin user ' + ctx.params.user
})

app.use(router.routes())
```

测试结果：  
![Alt](./koa/images/router-prefix.png)  

#### router.redirect(source, destination, code)  

重定向资源 source 到目标地址 destination， 使用 30x 状态码（code 定义）:

```javascript
// ...
let app = new Koa()
let router = new Router()
app.listen(8888)

const admin = router.prefix('/admin')

admin.get('/:user/:id', (ctx, next) => {
    ctx.body = 'admin user ' + ctx.params.user + ' id ' + ctx.params.id
    next()
})

 // 目的地地址要写全称，包含前缀
admin.redirect('/default/:id', '/admin/test', 303)

admin.get('/test', (ctx) => {
    ctx.body = 'in /admin/test'
})

app.use(router.routes())
```

输入： http://localhost:8888/admin/vince/6666 ,  显示： admin user vince id 6666  
输入： http://localhost:8888/admin/default/6666, 重定向到： http://localhost:8888/admin/test , 显示： in /admin/test  

#### router.param(param, middleware)  

给路由参数 param 添加中间件，后续 router 路径中 含有 这个参数的，都会首先触发这个中间件，一般用于自动验证等。  

```javascript


```

<br>

## 3. Middleware 中间件  

Koa 的最大特色，也是最重要的一个设计，就是中间件（middleware）。  

### 3.1 中间件的概念  

处在 **HTTP Request** 和 **HTTP Response** 中间，用来实现某种中间功能的 **函数** 就叫做中间件。  

基本上，Koa 所有的功能都是通过中间件实现的。每个中间件默认接受两个参数，第一个参数是 **Context 对象**，第二个参数是 **next 函数**。只要调用next函数，就可以把执行权转交给下一个中间件。  

通过 <code>app.use()</code> 可以加载中间件:  

```javascript
const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
  next();
}
app.use(logger)
```

### 3.2 中间件栈（middle stack）

多个中间件会形成一个**栈结构**，以"先进后出"（first-in-last-out）的顺序执行。  

1. 最外层的中间件首先执行。
2. 调用 next 函数，把执行权交给下一个中间件。
3. ...
4. 最内层的中间件最后执行。
5. 执行结束后，把执行权交回上一层的中间件。
6. ...
7. 最外层的中间件收回执行权之后，执行 next 函数后面的代码。  

```javascript
const one = (ctx, next) => {
  console.log('>> one')
  next();
  console.log('<< one')
}

const two = (ctx, next) => {
  console.log('>> two')
  next(); 
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
```
测试结果：  
```javascript
>> one
>> two
>> three
<< three
<< two
<< one
```

如果中间件内部没有调用 next 函数，那么执行权就不会传递下去。例如，如果将上面示例的中间件 two 中的 next() 去掉，则结果为：  

```javascript
>> one
>> two
<< two
<< one
```

### 3.3 异步中间件  

如果有异步操作（比如读取数据库），中间件就必须写成 **async** 函数。  

<br>

## 4. 错误处理  

### 4.1 500 错误  

如果代码运行过程中发生错误，我们需要把错误信息返回给用户。HTTP 协定约定这时要返回 500 状态码。Koa 提供了<code>ctx.throw()</code>方法，用来抛出错误，<code>ctx.throw(500)</code>就是抛出 500 错误。  

```javascript
const Koa = require('koa')
const app = new Koa()

const main = ctx => {
  ctx.throw()     // 不写错误状态码时， 默认为 500
  // 等效于 ctx.throw(500)
}

app.use(main)
app.listen(3000)
```
访问 http://localhost:3000/ 就会显示 "Internal Server Error"。  

### 4.2 404错误  

如果将ctx.response.status设置成404，就相当于ctx.throw(404)，返回404错误。  

```javascript
const main = ctx => {
  ctx.response.status = 404
  ctx.response.body = 'Page Not Found'
};
```
访问 http://localhost:3000/ 就会显示 "Page Not Found"。  

### 4.3 处理错误的中间件  

为了方便处理错误，最好使用 <code>try...catch</code> 将其捕获。但是，为每个中间件都写 <code>try...catch</code> 太麻烦，我们可以让最外层的中间件，负责所有中间件的错误处理。  

```javascript
const handle = async (ctx, next) => {
  try{
    await next()
  } catch(err) {
    ctx.response.status = err.statusCode || err.status || 500
    ctx.response.body = {
      massage: err.message
    }
  }
}

const main = ctx => {
  cxt.throw(500)
}

app.use(handler)
app.use(main)

app.listen(3000)
```

在上面的示例中， main 中间件是在 handle 中间件后面调用的，main 中间件抛物出错误，可以到外层的 handle 中间件进行处理。  

访问 http://localhost:3000/ 就会看到一个 500 页面，显示 {"message":"Internal Server Error"}  

### 4.4 error 事件的监听  

运行过程中一旦出错，Koa 会触发一个 error 事件。监听这个事件，也可以处理错误。  

```javascript
const main = ctx => {
  ctx.throw();
};

app.on('error', (err, ctx) =>
  console.error('server error', err);
);
```

访问 http://localhost:3000/ , 控制台就会报出错误。  

### 4.5 释放 error 事件  

需要注意的是，如果错误被 <code>try...catch</code> 捕获，就不会触发 error 事件。这时，必须调用 <code>ctx.app.emit()</code> ，手动释放 error 事件，才能让监听函数生效。  

```javascript
const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500
    ctx.response.type = 'html'
    ctx.response.body = '<p>Something wrong, please contact administrator.</p>'
    ctx.app.emit('error', err, ctx)  // 手动释放error事件
  }
};

const main = ctx => {
  ctx.throw(500)
}

app.on('error', function(err) {
  console.log('logging error ', err.message)
  console.log(err)
});

app.use(handler)
app.use(main)
app.listen(3000)
```

访问 http://localhost:3000/ 就会看到一个 500 页面，显示: Something wrong, please contact administrator. 同时，在控制台打印出错误消息：logging error  Internal Server Error。  

如果在 catch 捕获错误中，没有调用 <code>ctx.app.emit()</code> 手动释放 error 事件， 则 <code>app.on('error')</code> 无法监听到 error 事件，从而控制台就不能打印出错误消息。  

---

参考：  
[Koa 官方文档](https://github.com/koajs/koa)  
[Koa 、Koa-router 常用 API](https://blog.csdn.net/mjzhang1993/article/details/78752314)  
[Koa 框架教程](http://www.ruanyifeng.com/blog/2017/08/koa.html)