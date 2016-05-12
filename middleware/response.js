/**
 * @author spring
 * @fileoverview 中间件：返回数据
 * @date 2016-05-12
 */
 module.exports = async(ctx,next)=>{
    ctx.success = (result)=>{
        ctx.body = {
            code: 200,
            data: result,
            iserror: 0,
            msg: ''
        }
    }
    ctx.fail = (code,msg)=>{
        ctx.body = {
            code: code,
            data: '',
            iserror: 1,
            msg: msg
        }
    }
    await next();
 }