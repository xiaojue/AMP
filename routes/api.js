/**
 * @author spring
 * @fileoverview 配置通用路由的数据表名
 * @date 2016-04-29
 */
import Router from 'koa-router';
import tborm from '../models/orm'
import moment from 'moment'

const tables = ['urls','collection','results','arguments']
const router = Router({
    prefix: '/api'
});

for(let item of tables){
    router
        .get('/'+item, async (ctx,next) => {
            let querys = ctx.query,
                opts = {};
            if(querys['pageSize']){
                let index = querys['pageIndex'] || 0,
                    pageSize = parseInt(querys['pageSize']);
                opts = {
                    limit: [index*pageSize,pageSize]
                };
                delete querys['pageSize'];
                delete querys['pageIndex'];
            }
            let res = await ctx.mysqlQuery(item).get(querys,opts),
                data = res;
            if(item === 'collection'){
                for(let i=0,l=res.length;i<l;i++){
                    let item = res[i],
                        members = await ctx.mysqlQuery('members').get({"collection_id": item["id"]});
                    item["members"] = [];
                    for(let j=0,k=members.length;j<k;j++){
                        let member = members[j],
                            user = await ctx.mysqlQuery("users").get({"id": member["user_id"]});
                        item["members"] = item["members"].concat(user);
                    }
                }
            }
            if(opts.limit){ //如果是分页获取的，那需要获取总数total
                let items = await ctx.mysqlQuery(item).get(querys);
                data = {
                    result: res,
                    total: items.length
                }
            }
            ctx.success(data);
        })
        .post('/'+item,async (ctx,next) => {
            let res_check = await checkForeignkey(ctx,item);
            if(!res_check){
                ctx.fail(400,'请输入正确的字段值');
                return;
            }
            let data = ctx.body;
            if(item === 'collection'){
                data['ctime'] = (new Date()).valueOf();
                data['creater'] = ctx.session['userinfo']['username'];
            }
            let res = await ctx.mysqlQuery(item).post(data),
                result = await ctx.mysqlQuery(item).get({id: res['insertId']});
            ctx.success(result[0]);
        })
        .put('/'+item, async (ctx,next) => {
            let res = await checkId(ctx,item);
            if(res){
                ctx.fail(400,res);
                return;
            }
            let res1 = await ctx.mysqlQuery(item).put(ctx.body,{id: ctx.query.id}),
                result = await ctx.mysqlQuery(item).get({id: ctx.query.id});
            ctx.success(result);
        })
        .del('/'+ item, async (ctx, next)=> {
            let res = await checkId(ctx,item);
            if(res){
                ctx.fail(400,res);
                return;
            }
            let result = await ctx.mysqlQuery(item).delete({id: ctx.query.id});
            ctx.success(result);
        })
}
var checkId = async(ctx,item)=>{ //检测：在put delete中通过字符串参数传递过来的值是否是对的
    let id = ctx.query.id;
    if(!id){
        return '请填写接口的Id';
    }
    let items = await ctx.mysqlQuery(item).get({id: id});
    if(!items.length){
        return '请填写正确的Id';
    }
    return;
}
var checkForeignkey = async(ctx,item)=>{ //检测：在post的传递过来的外键是否正确
    let tb = tborm['relyon'][item];
    if(!tb){
        return true;
    }
    let id = ctx.body[tb.forkey];
    if(!id){
        return false;
    }
    if(tb){
        let res = await ctx.mysqlQuery(tb.tbname).get({id: id});
        if(res.length){
            return true;
        }
        return false;
    }
    return true;
}

module.exports = router;

