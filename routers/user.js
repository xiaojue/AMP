/*
 * login
 */

import Router from 'koa-router';

import md5 from 'md5';

import ldapConnect from '../utils/ldap.js';

import baseConfig from '../config/base.config.js';

const User = Router({
    prefix: '/user'
});

const safeWord = 'helloworld!';

const saveLogin = (ctx, userinfo) => {
    ctx.session.isLogin = true;
    ctx.session.userinfo = userinfo;
}

const delPassword = (userInfo) => {
    let _curr = JSON.parse(JSON.stringify(userInfo));
    delete _curr.password;
    return _curr;
};

const ldapClient = (ctx, email, pwd, remember, next) => {
    return ldapConnect((client, resolve, reject) => {
        client.search(baseConfig.ldap.group_base, {
            filter: '(userprincipalname=' + email + '*)',
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
                                if (docs.length) {
                                    saveLogin(ctx, delPassword(docs[0]));
                                    resolve(delPassword(docs[0]));
                                    client.unbind();
                                } else {
                                    const newUser = {};
                                    const _arr = entry.object.name.split('-');
                                    newUser.name = _arr[0];
                                    newUser.department = _arr[1] || '';
                                    newUser.role = _arr[2] || '';
                                    newUser.email = email;
                                    newUser.bg = '/dist/img/main_bg.png';
                                    newUser.avatar = '/dist/img/user_avatar.png';
                                    newUser.password = '';
                                    Users.create(newUser, function(err, doc) {
                                        resolve(delPassword(doc));
                                        saveLogin(ctx, delPassword(doc));
                                        client.unbind();
                                    });
                                }
                            })
                        }
                    });
                } else {
                    // ctx.status = 401;
                    reject('用户不存在');
                    client.unbind();
                }
            });
        });
    });
};


const normalLogin = (ctx, email, pwd, remember, next) => {
    return new Promise((resolve, reject) => {
        const Users = global.dbHandle.getModel('users');
        Users.find({
            email: email
        }).exec((err, docs) => {
            if (docs.length) {
                if (docs[0].password === md5(safeWord + pwd)) {
                    saveLogin(ctx, delPassword(docs[0]));
                    resolve(delPassword(docs[0]));
                } else {
                    reject('密码错误');
                }
            } else {
                reject('账号不存在');
            }
        })
    })
};

const register = (ctx) => {
    return new Promise(function(resolve, reject) {
        let email = ctx.body.email;
        let pwd = ctx.body.password;
        const Users = global.dbHandle.getModel('users');
        Users.find({
            email: email
        }).exec((err, docs) => {
            if (docs.length) {
                reject('账号已存在');
            } else {
               const newUser = {};
               newUser.name = email;
               newUser.department = '';
               newUser.role = '';
               newUser.email = email;
               newUser.bg = '/dist/img/main_bg.png';
               newUser.avatar = '/dist/img/user_avatar.png';
               newUser.password = md5(safeWord + pwd);
               Users.create(newUser, function(err, doc) {
                   saveLogin(ctx, delPassword(doc));
                   resolve(delPassword(doc), '注册成功');
               });
            }
        });
    })
}

User
    .get('/info', async (ctx, next) => {
        if (ctx.session.isLogin) {
            const Users = global.dbHandle.getModel('users');
            const regx = new RegExp('.*' + ctx.query.query + '.*');
            await Users.find({
                $or: [
                    { email: regx },
                    { name: regx }
                ]
            }).exec((err, docs) => {
                ctx.success(docs, '查询成功');
            })
        } else {
            ctx.fail(401, '请登录');
        }
    })
    .post('/login', async (ctx, next) => {
        let email = ctx.body.email,
            pwd = ctx.body.password,
            remember = ctx.body.remember;
        if (!email || !pwd) {
            ctx.fail(400, '请填写邮箱和密码');
            return;
        }
        if (ctx.body.type === 0) {
            await ldapClient(ctx, email, pwd, remember, next).then((res) => {
                ctx.success(res, '登录成功');
            }, (res) => {
                ctx.fail(400, res);
            });
        } else if (ctx.body.type === 1) {
            await normalLogin(ctx, email, pwd, remember, next).then((res) => {
                ctx.success(res, '登录成功');
            }, (res) => {
                ctx.fail(400, res);
            });
        }

    })
    .post('/logout', async (ctx, next) => {
        ctx.session = null;
        ctx.success('注销成功');
    })
    .post('/register', async (ctx, next) => {
        await register(ctx).then((res) => {
            ctx.success(res, '注册成功');
        }, (erro) => {
            ctx.fail(400, erro);
        })
    })

export default User;
