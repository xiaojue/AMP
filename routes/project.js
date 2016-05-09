/**
 * @author spring
 * @fileoverview 路由配置: 特殊处理的一些路由
 * @date 2016-05-03
 */
import Router from 'koa-router';
import db from '../models/mysql';
const router = Router({
    prefix: '/api'
});

router.get('/urls/all', async (ctx,next)=>{
    let sql = "select * from urls",
        urls = await db.query(sql,ctx.query,{
            type: "GET"
        }),
        arr_res = [];
    for(let url of urls){
        let res = {},
            sql2 = 'select * from arguments where url_id = ' + url["id"],
            sql3 = 'select * from results where url_id = ' + url["id"],
            args = await db.query(sql2,{},{
                type: "GET"
            }),
            results = await db.query(sql3,{},{
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
module.exports = router;