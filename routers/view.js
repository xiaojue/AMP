/*
 * view route
 */

import Router from 'koa-router';

const View = Router();

View.get('/', async (ctx, next) => {
	// userInfo 写入 cookies
	console.log(ctx.session.userinfo);
	if(ctx.session.isLogin){
		ctx.cookies.set('userInfo', new Buffer(JSON.stringify(ctx.session.userinfo)).toString("base64"), {
			httpOnly: false,
			expires: null
		});
	}
    await ctx.render('/index');
})

export default View;
