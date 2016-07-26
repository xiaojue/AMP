/* jshint ignore:start */
/*
 * AMP 入口文件
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

import Koa from 'koa';
import Static from 'koa-static';
import Views from 'koa-views';
import KoaBodyParser from 'koa-better-body';
import Session from 'koa2-cookie-session';
import Mongoose from 'mongoose';
import cors from 'koa-cors';
import response from './middleware/response.js';

// koa1中间件转换
import convert from 'koa-convert';

// all routers
import routers from './routers';

import env from './config/env.config.js';

// db about
import ip from 'ip';
import dbConfig from './dbconfig/config.json';
import dbs from './dbconfig/db.json';
import * as dbHandle from './database/dbHandle.js';
if (ip.address() === '10.69.205.26') {
	dbConfig.env = 'dev';
};
global.dbHandle = dbHandle;
global.db = Mongoose.connect('mongodb://' + dbs[dbConfig.env].host + ':' + dbs[dbConfig.env].port + '/AMP');

global.pwd = __dirname;

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
app.use(response);
app.use(convert(cors()));
app.use(Views(path.join(__dirname, './views')));

// static
app.use(convert(Static(path.join(__dirname, 'static'))));
app.use(convert(Static(path.join(__dirname, 'upload'))));

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
