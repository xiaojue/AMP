/**
 * @author spring
 * @fileoverview 配置通用路由的数据表名
 * @date 2016-04-29
 */
import Router from 'koa-router';

const tables = ['urls','collection','results','arguments']
const router = Router({
    prefix: '/api'
});

for(let item of tables){
    router
        .get('/'+item, async (ctx,next) => {
            console.log('getttttttt');
            let sql = "select * from " + item,
                res = await ctx.mysqlQuery(sql,ctx.query,{
                    type: "GET"
                });
            ctx.body = {
                code: 200,
                data: res,
                iserror: 0,
                msg: ''
            };
        })
        .post('/'+item,async (ctx,next) => {
            console.log("post");
            let sql = "insert into " + item,
                res = await ctx.mysqlQuery(sql,ctx.body,{
                    type: "POST"
                }),
                sql2 = "select * from "+ item + " where id=" + res['insertId'],
                result = await ctx.mysqlQuery(sql2,{},{
                    type: "GET"
                });
            ctx.body = {
                code: 200,
                data: result[0],
                iserror: 0,
                msg: ''
            };
        })
        .put('/'+item+'/:id', async (ctx,next) => {
            console.log("put");
            let sql = 'update '+item,
                res = await ctx.mysqlQuery(sql,ctx.body,{
                    type: 'PUT',
                    params: {id: ctx.params.id}
                });
            ctx.body = {
                code: 200,
                data: res,
                iserror: 0,
                msg: ''
            };
        })
        .del('/'+ item +'/:id', async (ctx, next)=> {
            console.log("del");
            let sql = 'delete from '+item,
                res = await ctx.mysqlQuery(sql,{},{
                    type: 'DELETE',
                    params: {id: ctx.params.id}
                });
            ctx.body = {
                code: 200,
                data: res,
                iserror: 0,
                msg: ''
            };
        })
}

module.exports = router;

