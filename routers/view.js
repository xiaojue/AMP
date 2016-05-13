/*
 * view route
 */

import Router from 'koa-router';
import Send from 'koa-send';

const View = Router();

View.get('/', async (ctx, next) => {
    await Send(ctx, './views/index.html');
})

export default View;
