/**
 * @fileoverview koa2 mysql middleview
 */

import mysqlPool from '../models/mysql';
import DecSql from '../utils/sql';

module.exports = async function (ctx, next) {
  var db = mysqlPool();
  ctx.mysqlQuery = function(sql, values, options) {
    sql = DecSql[options.type](sql, values, options);
    return db.client.query(sql);
  };
  await next();
  db.pool.end();
};
