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
import baseConfig from './config/base.config.js';

// db about
import dbConfig from './config/db.config.js';
import * as dbHandle from './database/dbHandle.js';
global.dbHandle = dbHandle;
global.db = Mongoose.connect('mongodb://' + dbConfig[env].host + ':' + dbConfig[env].port + '/' + dbConfig[env].database, {
	user: dbConfig[env].username,
	pass: dbConfig[env].password
});

global.pwd = __dirname;

const app = new Koa();
const httpPort = baseConfig.httpPort;
const httpsPort = baseConfig.httpsPort;
const options = {
	key: fs.readFileSync(path.join(__dirname, './pem/privatekey.pem')),
	cert: fs.readFileSync(path.join(__dirname, './pem/certificate.pem'))
};

// middleware
app.use(Session());
app.use(response);
app.use(convert(KoaBodyParser()));
app.use(convert(cors()));
app.use(Views(path.join(__dirname, './views')));
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

console.log(`http server listening on port ${httpPort} ...
https server listening on port ${httpsPort} ...`);
