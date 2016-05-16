/*
 * api route
 * 统一处理 projescts/urls
 */


import Router from 'koa-router';
import * as utils from '../utils/index.js';


const Api = Router({
    prefix: '/api'
});

const usingModel = ['projects', 'urls'];

const checkModel = (ctx, model) => {
	if(!utils.inArray(model, usingModel)){
		ctx.fail(403, '查询不合法');
		return true;
	}
}

Api
    .get('/:model', async (ctx, next) => {
    	const model = ctx.params.model;
    	if(checkModel(ctx, model)){
    		return;
    	}
        const query = ctx.query;
        const limit = Number(query.limit) || 10;
        const page = Number(query.page) || 1;

        const realQuery = {};
        const excludeQuery = ['limit', 'page'];
		for(let item in query){
			if(!utils.inArray(item, excludeQuery)){
				realQuery[item] = query[item];
			}
		}
        const Model = global.dbHandle.getModel(model);
        const result = await Model.find(realQuery).populate('creator').populate('main.members').sort({ 'create_time': -1 }).limit(limit).skip((page - 1) * limit);
        const all = await Model.find({});
		ctx.success({
			total: all.length,
			result: result
		}, '查询成功');
    })
    .post('/:model', async (ctx, next) => {
    	const model = ctx.params.model;
    	if(checkModel(ctx, model)){
    		return;
    	}
    	const postData = ctx.body;
    	const Model = global.dbHandle.getModel(model);
    	const Person = global.dbHandle.getModel('users');
    	var currentUser = new Person({ _id: ctx.session.userinfo._id});
    	const newModel = await Model.create({
    		name: ctx.body.name,
    		desc: ctx.body.desc,
    		creator: currentUser._id,
    		create_time: Date.now(),
    		main: ctx.body.main || {}
    	})
    	ctx.success(newModel, '新建成功');
    })
    .put('/:model', async (ctx, next) => {

    })
    .delete('/:model', async (ctx, next) => {
    	const model = ctx.params.model;
    	if(checkModel(ctx, model)){
    		return;
    	}
    	const Model = global.dbHandle.getModel(model);
    	const delModel = await Model.remove({
    		_id: ctx.query._id
    	})
    	ctx.success(delModel, '删除成功');
    })
   
export default Api;
