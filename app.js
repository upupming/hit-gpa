require('dotenv').config({ silent: true })
const Koa = require('koa')
const json = require('koa-json')
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')
const serve = require('koa-static')
const path = require('path')
const api = require('./server/routers/api')
// Fallback to index.html for applications that are using the HTML 5 history API
// 找不到页面时，Fallback 到 index.html，这对 Vue 的 history 模式来说是必要的
const historyApiFallback = require('koa2-history-api-fallback')
const koaRouter = require('koa-router')

const app = new Koa()
const port = parseInt(process.env.PORT) || 443

const router = koaRouter()

app.use(bodyparser())
app.use(json())
app.use(logger())

app.use(async (ctx, next) => {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.on('error', function(err, ctx) {
  console.log('server error', err)
  ctx.body = {
    success: false
  }
})

router.use('/api', api.routes())
app.use(router.routes())
app.use(historyApiFallback())
app.use(serve(path.resolve('dist')))

app.use(async (ctx, next) => {
  console.log(ctx, next)
})

app.listen(port, () => {
  console.log(`Koa is listening in ${port}`)
})

module.exports = app
