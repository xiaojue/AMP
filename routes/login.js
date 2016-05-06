/**
 * @author spring
 * @fileoverview 配置路由：用户登录
 * @date 2016-05-04
 */
import Router from 'koa-router';
import db from '../models/mysql';
import ldap from 'ldapjs'

const router = Router();
const ldapurl = 'ldap://10.69.100.1';
const username = 'yunyingbaobiao';
const password = '5P=/d_Xp';

router.get('/login',async (ctx,next)=>{
    if(ctx.session.isLogin){
        //ctx.redirect("/");
        ctx.status = 301;
        ctx.body = 301;
    }else{
        ctx.status = 401
        ctx.body = 401;
    }
})
router.post('/login',async (ctx,next)=>{
    let email = ctx.body.email,
        pwd = ctx.body.password,
        remember = ctx.body.remember;
    await ldapClient(ctx,email,pwd,remember,next).then(function(res){
        return res;
    }).then(function(res){
        ctx.body = res;
    });
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
                ctx.status = 400;
                resolve(err);
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
                                    ctx.status = 400;
                                    resolve('密码和账户不正确');
                                } else {
                                    let sql = "select * from users where username = '" + email + "'";
                                    db.query(sql,{},{
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
                                            db.query(sql,querys,{
                                                type: "POST"
                                            });
                                            saveLogin(ctx,querys);
                                            resolve(entry.object);
                                        }
                                    });                                    
                                }
                            });
                        } else {
                            unbind(client, next);
                            ctx.status = 401;
                            resolve("401");
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