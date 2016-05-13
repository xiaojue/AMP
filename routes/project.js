/**
 * @author spring
 * @fileoverview 路由配置: 特殊处理的一些路由
 * @date 2016-05-03
 */
import Router from 'koa-router';
import ldapConnect from '../libs/ldapConnect'
const router = Router({
    prefix: '/api'
});

router.get('/urls/all', async (ctx,next)=>{
    let urls = await ctx.mysqlQuery('urls').get(ctx.query),
        arr_res = [];
    for(let url of urls){
        let res = {},
            args = await ctx.mysqlQuery('arguments').get({'url_id': url['id']}),
            results = await ctx.mysqlQuery('results').get({'url_id': url['id']});
        res["url"] = url;
        res["arguments"] = args;
        res["results"] = results;
        arr_res.push(res);
    }
    success(ctx,arr_res);
});
router.get('/members/search',async (ctx,next)=>{ //成员的模糊搜索
    let query = ctx.query['query'],
        res = await ctx.mysqlQuery('members').get({
            "email": query,"username": query
        },{
            or: true
        });
    success(ctx,res);
});
router.post('/members/batch', async (ctx,next)=>{ //批量添加成员
    let collection_id = ctx.body["collection_id"],
        collections = await ctx.mysqlQuery('collection').get({"id": collection_id});
    if(!collections.length){
        fail(ctx,400,'没找到对应的collection');
        return;
    }
    let ids = ctx.body["users"];
    if(!ids){
        fail(ctx,400,'没有ids');
        return;
    }
    ids = ids.split(',');
    let results = [];
    for(var i=0,l=ids.length;i<l;i++){
        let id = ids[i],
            user = await ctx.mysqlQuery('users').get({"id": id});
        if(user.length){
            results.push(user[0]);
            await ctx.mysqlQuery('members').post({
                "collection_id": collection_id,
                "user_id": id
            });
        }
    }
    success(ctx,results);
});
router.del('/members', async (ctx,next)=>{ //删除成员
    let id = ctx.query["id"];
    if(!id){
        fail(ctx,400,'请填写要删除的成员Id');
        return;
    }
    let members = await ctx.mysqlQuery("members").get({"id": id});
    if(members.length){
        await ctx.mysqlQuery("members").delete({"id": id});
        success(ctx,"删除成功!");
    }else{
        fail(ctx,400,"没找到对应的member");
    }
});
router.get('/users/search', async (ctx,next)=>{ //用户的模糊搜索
    let query = ctx.query['query'],
        res = await ctx.mysqlQuery("users").get({
            "email": query,"username": query
        },{
            or: true
        });
    success(ctx,res);
});

var success = function(ctx,result){
    ctx.body = {
        code: 200,
        data: result,
        iserror: 0,
        msg: ''
    }
}
var fail = function(ctx,code,msg){
    ctx.body = {
        code: code,
        data: '',
        iserror: 1,
        msg: msg
    }
}
module.exports = router;
