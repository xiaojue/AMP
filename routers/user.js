/*
 * login
 */

import Router from 'koa-router';
import ldap from 'ldapjs'


const ldapurl = 'ldap://10.69.100.1';
const username = 'yunyingbaobiao';
const password = '5P=/d_Xp';

const router = Router({
    prefix: '/user'
});

router.get('/info', async (ctx, next) => {
	if(ctx.session.isLogin){
	    ctx.success(ctx.session.userinfo);
	}else{
	    ctx.fail(401,'请登录');
	}
})





router.post('/login', async (ctx, next) => {
	if()
})