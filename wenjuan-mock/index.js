const Koa = require('koa')
const Router = require('koa-router')
const mockList = require('./mock/index')
const { koaBody } = require("koa-body")

const app = new Koa()
const router = new Router()

app.use(koaBody({
    json: true, // 解析JSON格式的请求体
    form: true, // 解析表单格式的请求体
    text: true, // 解析文本格式的请求体
    multipart: true, // 添加这个选项
    urlencoded: true, // 添加这个选项
    jsonLimit: '10mb', // 设置JSON大小限制
    formLimit: '10mb', // 设置表单大小限制
}))

async function getRes(fn, ctx) {
    return new Promise(resolve => {
        setTimeout(() => {
            const res = fn(ctx)
            resolve(res)
        }, 1000)
    })
}

// 注册 mock 路由
mockList.forEach(item => {
    const { url, method, response } = item
    router[method](url, async ctx => {
        // const res = response()
        const res = await getRes(response, ctx) // 模拟网络请求的加载状态，1s
        ctx.body = res // 输入结果
    })
})

app.use(router.routes())
app.listen(3001) // port 端口
