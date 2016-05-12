/**
 * @author spring
 * @fileoverview 配置路由：提供模拟路由
 * @date 2016-05-03
 */
 import Router from 'koa-router';

 const api = Router({
    prefix: '/mock'
 });
 /**
 * title: 检测url是否正确(如果能在urls数据库中查询到)
 */
var checkUrl = async(ctx,type)=>{
    let url = ctx.request.url,
        sql = 'select * from urls where url = "' + url + '" and type = "'+ type +'"',
        res = await ctx.mysqlQuery(sql,ctx.query,{
            type: "GET"
        });
    return res;
}
/*
* title: 获取该url模拟返回的数据结果
**/
var getResult = async(ctx,item_id)=>{
    let sql = 'select * from results where url_id = ' + item_id,
        res = await ctx.mysqlQuery(sql,ctx.query,{
            type: "GET"
        });
    return res;
}

var getContent = (res)=>{
    try{
        res = JSON.parse(res['content']);
    }catch(err){
        res = res['content'];
    }
    return res;
}
api.all("*",async (ctx,next)=>{
    let urls = await checkUrl(ctx,ctx.request.method);
    if(!urls.length){
        // ctx.status = 404;
        ctx.body = {
            code: 404,
            data: '',
            iserror: 1,
            msg: '404'
        }
        return;
    }
    let res = await getResult(ctx,urls[0]["id"]);
    if(!res.length){
        // ctx.status = 404;
        ctx.body = {
            code: 404,
            data: '',
            iserror: 1,
            msg: '404'
        }
        return;
    }
    ctx.body = {
        code: 200,
        data: getContent(res[0]),
        iserror: 0,
        msg: ''
    };
});

module.exports = api;

