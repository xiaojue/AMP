/*
 * 返回信息中间件
 */

export default async (ctx, next) => {
    ctx.success = (result, msg) => {
        ctx.body = {
            code: 200,
            data: result,
            iserror: 0,
            msg: msg || ''
        }
    }
    ctx.fail = (code, msg) => {
        ctx.body = {
            code: code,
            data: '',
            iserror: 1,
            msg: msg
        }
    }
    await next();
}
