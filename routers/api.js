/*
 * api route
 */


import Route from 'koa-router';

const Api = Route({
	perfix: '/api'
})

/*

// 获取项目列表
$.ajax({
	url: '/api/projects',
	type: 'get',
	data: {
		limit: 10,
		page: 1,
		type: 'all',  // all/mine/coverme
	},
	success: (res) => {
		
	}
})

 */


Api.get('/:model', async (ctx, next) => {
	const query = ctx.query;
	const limit = query.limit ? query.limit : 10;
	const page = query.page ? query.page : 1;
	const type = query.type ? 'all';
	const Projects = global.dbHandel.getModel('projects');
	Projects.find({
		
	})
})