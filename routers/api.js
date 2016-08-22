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
	if (!utils.inArray(model, usingModel)) {
		ctx.fail(403, '查询不合法');
		return true;
	}
}

// 项目权限检测（传入项目详情）
const checkAuthority = (ctx, item) => {
	if (ctx.session.userinfo._id === item.creator._id) {
		return false;
	}
	for (let i = 0; i < item.members.length; i++) {
		const _curr = item.members[i];
		if (_curr._id == ctx.session.userinfo._id) {
			return false;
		}
	}
	return true;
}

// 接口权限检测（传入接口详情）
const checkAuthorityInApi = (ctx, item) => {
	if (ctx.session.userinfo._id === item.creator._id) {
		return false;
	}
	for (let i = 0; i < item.parent_project.members.length; i++) {
		const _curr = item.parent_project.members[i];
		if (_curr == ctx.session.userinfo._id) {
			return false;
		}
	}
	return true;
}

Api
	.get('/:model', async (ctx, next) => {
		const model = ctx.params.model;
		if (checkModel(ctx, model)) {
			return;
		}
		const query = ctx.query;
		const limit = Number(query.limit) || 10;
		const page = Number(query.page) || 1;

		const realQuery = {};
		const excludeQuery = ['limit', 'page'];
		for (let item in query) {
			if (!utils.inArray(item, excludeQuery)) {
				realQuery[item] = query[item];
			}
		}
		const Model = global.dbHandle.getModel(model);
		const result = await Model.find(realQuery).populate('creator').populate('members').populate('parent_project').sort({ 'create_time': -1 }).limit(limit).skip((page - 1) * limit);
		const all = await Model.find(realQuery);
		ctx.success({
			total: all.length,
			result: result
		}, '查询成功');
	})
	.post('/:model', async (ctx, next) => {
		const model = ctx.params.model;
		if (checkModel(ctx, model)) {
			return;
		}
		const postData = ctx.body;
		const Model = global.dbHandle.getModel(model);
		const Person = global.dbHandle.getModel('users');
		var currentUser = new Person({ _id: ctx.session.userinfo._id });

		const obj = ctx.body;
		const modelMap = model === 'projects' ? {
			name: obj.name,
			desc: obj.desc,
			creator: ctx.session.userinfo._id,
			create_time: Date.now(),
			members: obj.members,
			remark: obj.remark
		} : {
			name: obj.name,
			desc: obj.desc,
			creator: ctx.session.userinfo._id,
			create_time: Date.now(),
			url: obj.url,
			parent_project: obj.parent_project,
			status: obj.status,
			method: obj.method,
			request_params: obj.request_params,
			request_example: obj.request_example,
			response_params: obj.response_params,
			response_example: obj.response_example,
			remark: obj.remark,
		}

		const newModel = await Model.create(modelMap)
		ctx.success(newModel, '新建成功');
	})
	.put('/:model', async (ctx, next) => {
		const model = ctx.params.model;
		if (checkModel(ctx, model)) {
			return;
		}
		const Model = global.dbHandle.getModel(model);
		const obj = ctx.body;

		const modelMap = model === 'projects' ? {
			name: obj.name,
			desc: obj.desc,
			members: obj.members,
			remark: obj.remark
		} : {
			name: obj.name,
			desc: obj.desc,
			url: obj.url,
			parent_project: obj.parent_project,
			status: obj.status,
			method: obj.method,
			request_params: obj.request_params,
			request_example: obj.request_example,
			response_params: obj.response_params,
			response_example: obj.response_example,
			remark: obj.remark
		}


		if (model === 'projects' && checkAuthority(ctx, obj)) {
			ctx.fail(401, '无权限');
			return;
		}

		if (model === 'urls' && checkAuthorityInApi(ctx, obj)) {
			ctx.fail(401, '无权限');
			return;
		}

		const updateModel = await Model.update({
			'_id': obj._id
		}, {
			'$set': modelMap
		})
		ctx.success(updateModel, '修改成功');
	})
	.delete('/:model', async (ctx, next) => {
		const model = ctx.params.model;
		if (checkModel(ctx, model)) {
			return;
		}

		const willDelModel = global.dbHandle.getModel(model);
		const willDelData = await willDelModel.find({
			_id: ctx.query._id
		}).populate('creator').populate('members').populate('parent_project')


		if (model === 'projects' && checkAuthority(ctx, willDelData[0])) {
			ctx.fail(401, '无权限');
			return;
		}

		if (model === 'urls' && checkAuthorityInApi(ctx, willDelData[0])) {
			ctx.fail(401, '无权限');
			return;
		}

		if (model === 'projects') {
			const Urls = global.dbHandle.getModel('urls');
			await Urls.remove({
				parent_project: ctx.query._id
			})
		}
		const Model = global.dbHandle.getModel(model);
		const delModel = await Model.remove({
			_id: ctx.query._id
		})
		ctx.success(delModel, '删除成功');
	})

export default Api;
