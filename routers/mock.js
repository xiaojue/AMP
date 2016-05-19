/*
 * mock
 */

import Router from 'koa-router';

const Mock = Router({
	prefix: '/mock'
});

// 非登陆接口全局需验证
Mock.all('*', async (ctx, next) => {
	// console.log(api_url);
	// console.log(ctx.params.project_id);
	// console.log(ctx.params.api_url);



	

	
	ctx.success('success');
});

export default Mock;
