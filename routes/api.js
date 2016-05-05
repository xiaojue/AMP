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
            console.log('get');
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