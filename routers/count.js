/*
 * count route
 */

import Router from 'koa-router';

const Count = Router({
	prefix: '/count'
});

Count.get('/api', async (ctx, next) => {
    const Url = global.dbHandle.getModel('urls');
    const result = await Url.find(ctx.query);
    const ctxBody = {
        all: 0,
        continue: 0,
        complete: 0
    };
    ctxBody.all = result.length;
    for(let i = 0; i < result.length; i++){
        const _curr = result[i];
        if(_curr.status === 0){
            ctxBody.continue += 1;
        }
        if(_curr.status === 1){
           ctxBody.complete += 1;
        }
    }
    ctx.success(ctxBody, '成功');
})

export default Count;
