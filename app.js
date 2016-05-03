/*
 * AMP 入口文件
 */

import path from 'path';

import Koa from 'koa';
import Router from 'koa-router';
import Static from 'koa-static';
import Logger from 'koa-logger';
import Send from 'koa-send';
import KoaBodyParser  from 'koa-better-body'

// koa1中间件转换
import convert from 'koa-convert';

import routers from './routes'

const app = new Koa();
const port = 9090;

app.use(KoaBodyParser());

const index = Router();
index.get('/', async (ctx, next) => {
	await Send(ctx, './views/index.html');
})

// middleware
app.use(convert(Logger()));
app.use(convert(Static(path.join(__dirname, 'static'))));
// routers
app.use(index.routes());
for(let item of routers){
    app.use(item.routes());
}

// 错误处理
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

app.listen(port);
