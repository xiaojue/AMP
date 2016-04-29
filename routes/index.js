/**
 * @author spring
 * @fileoverview 路由配置
 * @date 2016-04-29
 */
import Router from 'koa-router';
import Send from 'koa-send';

import db from '../models/mysql';
import api from './api';

const router = Router({
    prefix: '/api'
});
/*
router
    .get('/collection', async (ctx,next) => {
        console.log('get');
        var sql = "select * from collection",
            res = await db.query(sql,ctx.query,{
                type: "GET"
            });
        ctx.body = res;
    })
    .post('/collection',async (ctx,next) => {
        console.log("post");
        var sql = "insert into collection",
            res = await db.query(sql,ctx.body,{
                type: "POST"
            });
        ctx.body = res;
    })
    .put('/collection/:id', async (ctx,next) => {
        console.log("put");
        var sql = 'update collection',
            res = await db.query(sql,ctx.body,{
                type: 'PUT',
                params: ctx.params
            });
        ctx.body = res;
    })
    .del('/collection/:id', async (ctx, next)=> {
        console.log("del");
        var sql = 'delete from collection',
            res = await db.query(sql,{},{
                type: 'DELETE',
                params: ctx.params
            });
        ctx.body = res;
    })
*/
for(var i=0,l=api.length;i<l;i++){
    var item = api[i];
    console.log(item);
    router
        .get('/'+item, async (ctx,next) => {
            console.log('get');
            var sql = "select * from " + item,
                res = await db.query(sql,ctx.query,{
                    type: "GET"
                });
            ctx.body = res;
        })
        .post('/'+item,async (ctx,next) => {
            console.log("post");
            var sql = "insert into " + item,
                res = await db.query(sql,ctx.body,{
                    type: "POST"
                });
            ctx.body = res;
        })
        .put('/'+item+'/:id', async (ctx,next) => {
            console.log("put");
            var sql = 'update '+item,
                res = await db.query(sql,ctx.body,{
                    type: 'PUT',
                    params: ctx.params
                });
            ctx.body = res;
        })
        .del('/'+ item +'/:id', async (ctx, next)=> {
            console.log("del");
            var sql = 'delete from '+item,
                res = await db.query(sql,{},{
                    type: 'DELETE',
                    params: ctx.params
                });
            ctx.body = res;
        })
}
 
module.exports = router;
