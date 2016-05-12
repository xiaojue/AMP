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
        attrs = ctx.query;
    attrs['url'] = url;
    attrs['type'] = type;
    return await ctx.mysqlQuery("urls").get(attrs);
}
/*
* title: 获取该url模拟返回的数据结果
**/
var getResult = async(ctx,item_id)=>{
    let attrs = ctx.query;
    attrs['url_id'] = item_id;
    return await ctx.mysqlQuery('results').get(attrs);
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

