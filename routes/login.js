/**
 * @author spring
 * @fileoverview 配置路由：用户登录
 * @date 2016-05-04
 */
import Router from 'koa-router';
import ldap from 'ldapjs'

const router = Router({
    prefix: '/api'
});
const ldapurl = 'ldap://10.69.100.1';
const username = 'yunyingbaobiao';
const password = '5P=/d_Xp';

router.get('/login',async (ctx,next)=>{
    if(ctx.session.isLogin){
        ctx.body = {
            code: 200,
            data: ctx.session.userinfo,
            iserror: 0,
            msg: ''
        };
    }else{
        // ctx.status = 401;
        ctx.body = {
            code: 401,
            data: '',
            iserror: 1,
             msg: '请登录'
        };
    }
})
router.post('/login',async (ctx,next)=>{
    let email = ctx.body.email,
        pwd = ctx.body.password,
        remember = ctx.body.remember;
    if(!email || !pwd){
        // ctx.status = 400;
        ctx.body = {
            code: 400,
            data: '',
            iserror: 1,
            msg: '请填写邮箱和密码'
        }
        return;
    }
    await ldapClient(ctx,email,pwd,remember,next).then(function(res){
        ctx.body = {
            code: 200,
            data: res,
            iserror: 0,
            msg: ''
        };
    },function(res){
        ctx.body = {
            code: 400,
            data: '',
            msg: res,
            iserror: 1
        };
    });
});
router.post('/logout',async (ctx,next)=>{
    ctx.session = null;
    ctx.body = {
        code: '200',
        data: '',
        iserror: 0,
        msg: '注销成功'
    };
});
router.all('*',async (ctx,next)=>{
    if(!ctx.session.isLogin){
        // ctx.status = 401;
        ctx.body = {
            code: 401,
            data: '',
            iserror: 1,
            msg: '请登录'
        };
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
    return new Promise(function(resolve,reject){
        let client = ldap.createClient({
            url: ldapurl,
            timeout: 5000,
            connectTimeout: 10000
        });
        client.bind(username, password, function(err) {
            if (err) {
                unbind(client, next);
                // ctx.status = 400;
                reject(err);
            } else {
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
                                    let sql = "select * from users where username = '" + email + "'";
                                    ctx.mysqlQuery(sql,{},{
                                        type: "GET"
                                    }).then(function(res){
                                        return res;
                                    }).then(function(users){
                                        if(users.length){
                                            saveLogin(ctx,users[0]);
                                            resolve(users[0]);
                                        }else{
                                            let sql = 'insert into users',
                                                querys = {
                                                    name: entry.object.name,
                                                    username: email,
                                                    email: email
                                                };
                                            ctx.mysqlQuery(sql,querys,{
                                                type: "POST"
                                            });
                                            saveLogin(ctx,querys);
                                            resolve(querys);
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
            }
        });
    });
}
var saveLogin = function(ctx,userinfo){
    ctx.session.isLogin = true;
    ctx.session.userinfo = userinfo;
}

module.exports = router;
