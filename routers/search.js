/*
 * search
 */

import Router from 'koa-router';

import request from 'request';

const Search = Router({
	prefix: '/search'
});


Search.post('/:model', async (ctx, next) => {
    const Model = global.dbHandle.getModel(ctx.params.model);
    const regx = new RegExp('.*' + ctx.query.query + '.*');
    await Model.find({
        $or: [
        	{_id: regx},
            { email: regx },
            { name: regx },
            {desc: regx}
        ]
    }).exec((err, docs) => {
        ctx.success(docs, '查询成功');
    })
});

export default Search;


/*
.get('/info', async (ctx, next) => {
        if (ctx.session.isLogin) {
            const Users = global.dbHandle.getModel('users');
            const regx = new RegExp('.*' + ctx.query.query + '.*');
            await Users.find({
                $or: [
                    { email: regx },
                    { name: regx }
                ]
            }).exec((err, docs) => {
                ctx.success(docs, '查询成功');
            })
        } else {
            ctx.fail(401, '请登录');
        }
    })
 */
