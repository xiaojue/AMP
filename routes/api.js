/**
 * @author spring
 * @fileoverview 配置通用路由的数据表名
 * @date 2016-04-29
 */
import Router from 'koa-router';
import db from '../models/mysql';

const tables = ['urls','collection','results','arguments']
const router = Router({
    prefix: '/api'
});

for(let item of tables){
    router
        .get('/'+item, async (ctx,next) => {
            console.log('getttttttt');
            let sql = "select * from " + item,
                res = await db.query(sql,ctx.query,{
                    type: "GET"
                });
            ctx.body = res;
        })
        .post('/'+item,async (ctx,next) => {
            console.log("post");
            let sql = "insert into " + item,
                res = await db.query(sql,ctx.body,{
                    type: "POST"
                }),
                sql2 = "select * from "+ item + " where id=" + res['insertId'],
                result = await db.query(sql2,{},{
                    type: "GET"
                });
            ctx.body = result[0];
        })
        .put('/'+item+'/:id', async (ctx,next) => {
            console.log("put");
            let sql = 'update '+item,
                res = await db.query(sql,ctx.body,{
                    type: 'PUT',
                    params: ctx.params
                });
            ctx.body = res;
        })
        .del('/'+ item +'/:id', async (ctx, next)=> {
            console.log("del");
            let sql = 'delete from '+item,
                res = await db.query(sql,{},{
                    type: 'DELETE',
                    params: ctx.params
                });
            ctx.body = res;
        })
}

module.exports = router;


// CREATE TABLE urls (
//       id int not null  AUTO_INCREMENT,
//       url VARCHAR(200),
//       type VARCHAR(50),
//       collection_id INT NOT NULL,
//       PRIMARY KEY (`id`),
//       CONSTRAINT FOREIGN KEY (collection_id) REFERENCES collection(id)
//       ON DELETE  RESTRICT  ON UPDATE CASCADE
// );

// CREATE TABLE results (
//       id int not null  AUTO_INCREMENT,
//       content text,
//       url_id INT NOT NULL,
//       PRIMARY KEY (`id`),
//       CONSTRAINT FOREIGN KEY (url_id) REFERENCES urls(id)
//       ON DELETE  RESTRICT  ON UPDATE CASCADE
// );

// CREATE TABLE arguments (
//       id int not null  AUTO_INCREMENT,
//       title varchar(50),
//       type varchar(50) default 'text',
//       value varchar(200) not null,
//       url_id INT NOT NULL,
//       PRIMARY KEY (`id`),
//       CONSTRAINT FOREIGN KEY (url_id) REFERENCES urls(id)
//       ON DELETE  RESTRICT  ON UPDATE CASCADE
// );

// CREATE TABLE users (
//   `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
//   `name` varchar(255) DEFAULT NULL COMMENT '姓名',
//   `username` varchar(255) DEFAULT NULL COMMENT '账号名',
//   `email` varchar(50) DEFAULT NULL COMMENT 'email',
//   `department` varchar(50) DEFAULT NULL COMMENT '部门',
//   `role` varchar(255) DEFAULT NULL COMMENT '角色',
//   `remark` varchar(255) DEFAULT NULL COMMENT '备注',
//   `status` tinyint(2) DEFAULT NULL COMMENT '状态：1启用，0禁用',
//   `limited` varchar(255) DEFAULT NULL COMMENT '控制',
//   `date` bigint(15) DEFAULT NULL COMMENT 'date',
//   `is_admin` tinyint(2) DEFAULT NULL COMMENT 'isAdmin = 99 超级管理员',
//   `export` varchar(255) DEFAULT NULL COMMENT '导出权限',
//   PRIMARY KEY (`id`)
// ) ;