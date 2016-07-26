/*
 * view route
 */
import fs from 'fs';
import Router from 'koa-router';

import env from '../config/env.config.js';

const View = Router();

View.get('/', async(ctx, next) => {
	// userInfo 写入 cookies
	if (ctx.session.isLogin) {
		ctx.cookies.set('userInfo', new Buffer(JSON.stringify(ctx.session.userinfo)).toString("base64"), {
			httpOnly: false,
			expires: null
		});
	}
	if (env === 'dev') {
		await ctx.render('/index.dev.html');
	} else {
		await ctx.render('/index.production.html');
	}

})

export default View;
