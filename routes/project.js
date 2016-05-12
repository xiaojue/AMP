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
    ctx.body = {
        code: 200,
        data: arr_res,
        iserror: 0,
        msg: ''
    };
});
router.get('/members/search',async (ctx,next)=>{ //成员的模糊搜索
    let query = ctx.query['query'],
        res = await ctx.mysqlQuery('members').get({
            "email": query,"username": query
        },{
            or: true
        });
    ctx.body = {
        code: 200,
        data: res,
        iserror: 0,
        msg: ''
    }
});
router.post('/members/batch', async (ctx,next)=>{ //批量添加成员
    // let ids = ctx.body['ids'],
    //     sql = 'select * from users where id in (' + ids +')',
    //     users = await ctx.mysqlQuery(sql,{},{
    //         type: "GET"
    //     });
    // ctx.body = users;
});
router.get('/users/search', async (ctx,next)=>{ //用户的模糊搜索
    let query = ctx.query['query'],
        res = await ctx.mysqlQuery("users").get({
            "email": query,"username": query
        },{
            or: true
        });
    ctx.body = {
        code: 200,
        data: res,
        iserror: 0,
        msg: ''
    }
});

module.exports = router;
