/*
 * login
 */

import Router from 'koa-router';


import { ldapConnect } from '../utils/index.js';

const User = Router({
    prefix: '/user'
});


const saveLogin = (ctx, userinfo) => {
    ctx.session.isLogin = true;
    ctx.session.userinfo = userinfo;
}

const ldapClient = (ctx, email, pwd, remember, next) => {
    return ldapConnect((client, resolve, reject) => {
        if (email.indexOf("@") < 0) {
            email += '@gomeplus.com';
        }
        client.search('ou=美信,dc=meixin,dc=com', {
            filter: '(userprincipalname=' + email + ')',
            scope: 'sub'
        }, (err, resp) => {
            var entrys = [];
            resp.on('searchEntry', (entry) => {
                entrys.push(entry);
            });
            resp.on('error', next);
            resp.on('end', () => {
                if (entrys.length === 1) {
                    var entry = entrys[0];
                    client.bind(entry.object.dn, pwd, (err) => {
                        //验证成功
                        if (err) {
                            // ctx.status = 400;
                            reject('密码和账户不正确');
                            client.unbind();
                        } else {
                            const Users = global.dbHandle.getModel('users');
                            Users.find({
                                email: email
                            }).exec((err, docs) => {
                                if(docs.length){
                                    saveLogin(ctx, docs[0]);
                                    resolve(docs[0]);
                                    client.unbind();
                                }else{
                                    const newUser = {};
                                    const _arr = entry.object.name.split('-');
                                    newUser.name = _arr[0];
                                    newUser.department = _arr[1] || '';
                                    newUser.role = _arr[2] || '';
                                    newUser.email = email;
                                    newUser.bg = '/dist/img/main_bg.png';
                                    newUser.avatar = '/dist/img/user_avatar.png';
                                    Users.create(newUser, function(err, doc){
                                        resolve(doc);
                                        saveLogin(ctx, doc);
                                        client.unbind();
                                    });
                                }
                            })
                        }
                    });
                } else {
                    // ctx.status = 401;
                    reject("用户名填写错误");
                    client.unbind();
                }
            });
        });
    });
}

User
    .post('/login', async (ctx, next) => {
        let email = ctx.body.email,
            pwd = ctx.body.password,
            remember = ctx.body.remember;
        if (!email || !pwd) {
            ctx.fail(400, '请填写邮箱和密码');
            return;
        }
        await ldapClient(ctx, email, pwd, remember, next).then((res) => {
            ctx.success(res, '登录成功');
        }, (res) => {
            ctx.fail(400, res);
        });
    })
    .post('/logout', async (ctx, next) => {
        ctx.session = null;
        ctx.success('注销成功');
    })

export default User;
