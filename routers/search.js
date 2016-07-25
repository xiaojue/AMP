/*
 * search
 */

import Router from 'koa-router';

import request from 'request';

const Search = Router({
	prefix: '/search'
});


Search.get('/:model', async (ctx, next) => {
    const Model = global.dbHandle.getModel(ctx.params.model);
    const regx = new RegExp('.*' + ctx.query.query + '.*', 'i');
    const limit = Number(ctx.query.limit) || 10;
    const page = Number(ctx.query.page) || 1;

    const queryParams = {
        $or: [
            { email: regx },
            { name: regx },
            { desc: regx },
            { url: regx }
        ]
    }

    if(ctx.params.model === 'urls'){
        queryParams.parent_project = ctx.query.parent_project;
    }
    queryParams.members = ctx.query.members;

    const realResult = await Model.find(queryParams).populate('creator').populate('members').populate('parent_project').limit(limit).skip((page - 1) * limit).sort({ 'create_time': -1 });
    const allLen = await Model.find(queryParams);

    ctx.success({
        total: allLen.length,
        result: realResult
    }, '查询成功');
});

export default Search;