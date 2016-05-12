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
    let sql = "select * from urls",
        urls = await ctx.mysqlQuery(sql,ctx.query,{
            type: "GET"
        }),
        arr_res = [];
    for(let url of urls){
        let res = {},
            sql2 = 'select * from arguments where url_id = ' + url["id"],
            sql3 = 'select * from results where url_id = ' + url["id"],
            args = await ctx.mysqlQuery(sql2,{},{
                type: "GET"
            }),
            results = await ctx.mysqlQuery(sql3,{},{
                type: "GET"
            });

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
        sql = 'select * from members ';
    if(query){
        sql += " where email like '%" + query + "%' or username like '%" + query + "%'";
    }
    let res = await ctx.mysqlQuery(sql,{},{
        type: "GET"
    });
    ctx.body = {
        code: 200,
        data: res,
        iserror: 0,
        msg: ''
    }
});
router.post('/members/batch', async (ctx,next)=>{ //批量添加成员
    let ids = ctx.body['ids'],
        sql = 'select * from users where id in (' + ids +')',
        users = await ctx.mysqlQuery(sql,{},{
            type: "GET"
        });
    ctx.body = users;
});
router.get('/users/search', async (ctx,next)=>{ //用户的模糊搜索
    let query = ctx.query['query'],
        sql = 'select * from users ';
    if(query){
        sql += " where email like '%" + query + "%' or username like '%" + query + "%'";
    }
    let res = await ctx.mysqlQuery(sql,{},{
        type: "GET"
    });
    ctx.body = {
        code: 200,
        data: res,
        iserror: 0,
        msg: ''
    }
});

module.exports = router;
