/*
 * postman
 */

import Router from 'koa-router';

import request from 'request';

const Postman = Router();


Postman.post('/postman', async (ctx, next) => {
    const obj = ctx.body;

    await new Promise((resolve, reject) => {
        request({
            url: obj.url,
            method: obj.type
        },(err, res, body) => {
        	ctx.body = body;
        	resolve();
        })
        .on('err', () => {
        	reject();
        })
    })
});

export default Postman;
