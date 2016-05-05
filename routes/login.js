/**
 * @author spring
 * @fileoverview 配置路由：用户登录
 * @date 2016-05-04
 */
import Router from 'koa-router';
import db from '../models/mysql';

const router = Router();

router.post('/login',async (ctx,next)=>{
    ctx.session.message = "something";
    ctx.body = ctx.session.message;
});
router.get('/login',async (ctx,next)=>{
    ctx.body = ctx.session.message;
})
module.exports = router;