import Router from 'koa-router';
import Send from 'koa-send';
import db from '../models/mysql'

const router = Router();
router
    .get('/abc', (ctx,next) => {
        ctx.body = "Hello world;"
    })
    .get('/api/collection', async (ctx,next) => {
        var res = await db.query("select * from collection;");
        ctx.body = res;
    })
 
module.exports = router;
