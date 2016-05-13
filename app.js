/* jshint ignore:start */
/*
 * AMP 入口文件
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

import Koa from 'koa';
import Static from 'koa-static';
import Logger from 'koa-logger';
import KoaBodyParser from 'koa-better-body';
import Session from 'koa2-cookie-session';
import mongoose from 'mongoose';

// all routers
import routers from './routers';

// koa1中间件转换
import convert from 'koa-convert';

// db about
import dbHandle from './database/dbHandle.js';
global.dbHandle = dbHandle;
global.db = mongoose.connect('mongodb://localhost:27017/AMP');

const app = new Koa();
const httpPort = 9090;
const httpsPort = 8989;
const options = {
    key: fs.readFileSync('./pem/privatekey.pem'),
    cert: fs.readFileSync('./pem/certificate.pem')
};

// middleware
app.use(KoaBodyParser());
app.use(Session());
app.use(convert(Logger()));

// static
app.use(convert(Static(path.join(__dirname, 'static'))));

// use all route
for (var item of routers) {
    app.use(item.routes(), item.allowedMethods());
}

// err handler
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

app.listen(httpPort);
https.createServer(options, app.callback()).listen(httpsPort);
