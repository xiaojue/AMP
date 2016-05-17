/*
 * view route
 */

import Router from 'koa-router';

const View = Router();

View.get('/', async (ctx, next) => {
	// userInfo 写入 cookies
	if(ctx.session.isLogin){
		ctx.cookies.set('userInfo', new Buffer(JSON.stringify(ctx.session.userinfo)).toString("base64"), {
			httpOnly: false,
			expires: null
		});
	}
    await ctx.render('/index');
})

// 非登陆接口全局需验证
View.all(/^((?!\/user).)*$/,async (ctx, next)=>{
    if(!ctx.session.isLogin){
        ctx.fail(401,'请登录');
        return;
    }
    await next();
});

export default View;
