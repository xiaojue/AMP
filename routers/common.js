/*
 * common route
 */

import Router from 'koa-router';

const Common = Router();

// 无需登陆接口过滤
Common.all(/^((?!\/user|mock).)*$/, async (ctx, next) => {
    if(!ctx.session.isLogin){
        ctx.fail(401,'请登录');
        return;
    }
    await next();
});

export default Common;
