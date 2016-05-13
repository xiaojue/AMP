/**
 * @author spring
 * @fileoverview 配置路由：用户登录
 * @date 2016-05-04
 */
import Router from 'koa-router';
import ldapConnect from '../libs/ldapConnect'

const router = Router({
    prefix: '/api'
});

router.get('/login',async (ctx,next)=>{
    if(ctx.session.isLogin){
        ctx.success(ctx.session.userinfo);
    }else{
        ctx.fail(401,'请登录');
    }
})
router.post('/login',async (ctx,next)=>{
    let email = ctx.body.email,
        pwd = ctx.body.password,
        remember = ctx.body.remember;
    if(!email || !pwd){
        ctx.fail(400,'请填写邮箱和密码');
        return;
    }
    await ldapClient(ctx,email,pwd,remember,next).then(function(res){
        ctx.success(res);
    },function(res){
        ctx.fail(400,res);
    });
});
router.post('/logout',async (ctx,next)=>{
    ctx.session = null;
    ctx.success('注销成功');
});
router.all('*',async (ctx,next)=>{
    if(!ctx.session.isLogin){
        ctx.fail(401,'请登录');
        return;
    }
    await next();
});

function unbind(client, next) {
    // client.unbind(function(err) {
    //     if (err) {
    //         next(err);
    //     }
    // });
}

var ldapClient = function(ctx,email,pwd,remember,next){
    return ldapConnect(function(client,resolve,reject){
        if (email.indexOf("@") < 0) {
            email += '@gomeplus.com';
        }
        client.search('ou=美信,dc=meixin,dc=com', {
            filter: '(userprincipalname=' + email + ')',
            scope: 'sub'
        }, function(err, resp) {
            var entrys = [];
            resp.on('searchEntry', function(entry) {
                entrys.push(entry);
            });
            resp.on('error', next);
            resp.on('end', function() {
                if (entrys.length === 1) {
                    var entry = entrys[0];
                    client.bind(entry.object.dn, pwd, function(err) {
                        //验证成功
                        if (err) {
                            unbind(client, next);
                            // ctx.status = 400;
                            reject('密码和账户不正确');
                        } else {
                            ctx.mysqlQuery('users').get({
                                "username": email
                            }).then(function(users){
                                if(users.length){
                                    saveLogin(ctx,users[0]);
                                    resolve(users[0]);
                                }else{
                                    let querys = {
                                        name: entry.object.name,
                                        username: email,
                                        email: email
                                    };
                                    ctx.mysqlQuery('users').post(querys).then(function(){
                                        resolve(querys);
                                    });
                                    saveLogin(ctx,querys);
                                }
                            });
                        }
                    });
                } else {
                    unbind(client, next);
                    // ctx.status = 401;
                    reject("用户名填写错误");
                }
            });
        });
    });
}
var saveLogin = function(ctx,userinfo){
    ctx.session.isLogin = true;
    ctx.session.userinfo = userinfo;
}

module.exports = router;
