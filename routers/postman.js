/*
 * postman
 */

import Router from 'koa-router';

import request from 'request';

const Postman = Router();


Postman.post('/postman', async (ctx, next) => {
    const obj = ctx.body;

    const params = ctx.body.params;

    if(obj.type == 'get' || obj.type == 'delete'){
        obj.url = obj.url + '?'

        let _curr = [];
        Object.keys(params).forEach((item) => {
            _curr.push(item + '=' + params[item]);
        })
        obj.url += _curr.join('&');
    }

    await new Promise((resolve, reject) => {
        request({
            url: obj.url,
            method: obj.type,
            form: params
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
