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
    const regx = new RegExp('.*' + ctx.query.query + '.*');
    await Model.find({
        $or: [
        	// { _id: regx},
            { email: regx },
            { name: regx },
            {desc: regx}
        ]
    }).populate('creator').populate('members').populate('parent_project').sort({ 'create_time': -1 }).exec((err, docs) => {
        ctx.success({
            total: docs.length,
            result: docs
        }, '查询成功');
    })
});

export default Search;