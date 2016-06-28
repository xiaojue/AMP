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
            form: params,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36'
            }
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
