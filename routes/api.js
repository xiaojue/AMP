/**
 * @author spring
 * @fileoverview 配置通用路由的数据表名
 * @date 2016-04-29
 */
import Router from 'koa-router';
import db from '../models/mysql';
import tborm from '../models/orm'

const tables = ['urls','collection','results','arguments']
const router = Router({
    prefix: '/api'
});

for(let item of tables){
    router
        .get('/'+item, async (ctx,next) => {
            console.log('get');
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
            console.log("posttttttttt");
            let res_check = await checkForeignkey(ctx,item);
            if(!res_check){
                ctx.body = {
                    code: 400,
                    data: '',
                    iserror: 1,
                    msg: '请输入正确的字段值'
                }
                return;
            }
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
        .put('/'+item, async (ctx,next) => {
            console.log("put");
            let res = await checkId(ctx,item);
            if(res){
                ctx.body = {
                    code: 400,
                    data: '',
                    iserror: 1,
                    msg: res
                }
                return;
            }
            let sql = 'update '+item,
                res1 = await ctx.mysqlQuery(sql,ctx.body,{
                    type: 'PUT',
                    params: {id: ctx.query.id}
                }),
                sql2 = "select * from "+ item + " where id= " + ctx.query.id,
                result = await db.query(sql2,{},{
                    type: "GET"
                });
            ctx.body = {
                code: 200,
                data: result,
                iserror: 0,
                msg: ''
            };
        })
        .del('/'+ item, async (ctx, next)=> {
            console.log("del");
            let res = await checkId(ctx,item);
            if(res){
                ctx.body = {
                    code: 400,
                    data: '',
                    iserror: 1,
                    msg: res
                }
                return;
            }
            let sql = 'delete from '+item,
                result = await ctx.mysqlQuery(sql,{},{
                    type: 'DELETE',
                    params: {id: ctx.query.id}
                });
            ctx.body = {
                code: 200,
                data: result,
                iserror: 0,
                msg: ''
            };
        })
}
var checkId = async(ctx,item)=>{
    let id = ctx.query.id;
    if(!id){
        return '请填写接口的ID';
    }
    let sql = 'select * from ' + item + " where id = " + id,
        items = await db.query(sql,{},{
            type: "GET"
        });
    if(!items.length){
        return '请填写正确的Id';
    }
    return;
}
var checkForeignkey = async(ctx,item)=>{
    let tb = tborm['relyon'][item];
    if(tb){
        let sql = "select * from " + tb["tbname"] + " where id = " + ctx.body[tb.forkey],
            res = await db.query(sql,{},{
                type: "GET"
            });
        if(res.length){
            return true;
        }
        return false;
    }
    return true;
}

module.exports = router;
