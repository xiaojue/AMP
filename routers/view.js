/*
 * view route
 */

import Router from 'koa-router';

const View = Router();

View.get('/', async (ctx, next) => {
    await ctx.render('/index',{
    	userinfo: ctx.session.userinfo
    });
})

export default View;
