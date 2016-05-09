/**
 * @author spring
 * @fileoverview 连接数据库并且重写GET POST DELETE PUT方法
 * @date 2016-04-29
 */
var db = require("../config/db.json");

var wrapper = require('co-mysql'),
  mysql = require('mysql');

var options = {
  host: db.host,
  port: db.port,
  database: db.dbname,
  user: db.username,
  password: db.pwd
};

module.exports = function() {
  var pool = mysql.createPool(options);
  return {
    client: wrapper(pool),
    pool: pool
  };
};
