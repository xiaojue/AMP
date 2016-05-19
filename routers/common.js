/*
 * common route
 */

import Router from 'koa-router';

const Common = Router();

// 非登陆接口全局需验证
// Common.all(/^((?!\/user).)*$/, async (ctx, next) => {
//     if(!ctx.session.isLogin){
//         ctx.fail(401,'请登录');
//         return;
//     }
//     await next();
// });

export default Common;
