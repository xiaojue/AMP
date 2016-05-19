/*
 * postman
 */

import Router from 'koa-router';

import request from 'request';

const Postman = Router();

// const requestPromise = () => {
// 	return new Promise((resolve, reject) => {
// 		request = resolve;
// 	})
// }


// 非登陆接口全局需验证
Postman.post('/postman', async (ctx, next) => {
    const obj = ctx.body;



    // await requestPromise({
    // 	url: obj.url,
    // 	method: obj.type
    // }, (err, res, body) => {
    // 	console.log(body);
    // 	console.log(1);
    	
    // })

	ctx.success('123', '成功');

    // ctx.body 
    // .on('error', (err) => {
    // 	console.log(err);
    // })
    // .on('end', () => {

    // })
    // console.log(2);
    // ctx.success(res, '成功');

});

export default Postman;
