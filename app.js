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
import fs from 'fs';
import https from 'https';

import session from './koa-session2';

// koa1中间件转换
import convert from 'koa-convert';

import routers from './routes'
import db from './config/db.json'

const app = new Koa();
const port = 9090;
const options = {
    key: fs.readFileSync('./privatekey.pem'),
    cert: fs.readFileSync('./certificate.pem')
}


app.use(KoaBodyParser());
app.use(
    session({
        key: "SESSIONID",
        maxAge: 60*60*24*1000
    })
);

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
    app.use(item.routes(),item.allowedMethods());
}

// 错误处理
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

app.listen(8989);
https.createServer(options, app.callback()).listen(port);
