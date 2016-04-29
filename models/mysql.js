var db = require("../config/db.json");

var wrapper = require('co-mysql'),
    mysql = require('mysql');
var options = {
    host : db.host,
    port : db.port ,
    database : db.dbname,
    user: db.username,
    password : db.pwd
};

var pool = mysql.createPool(options),
    p = wrapper(pool);

module.exports.query = function(sql){
    return p.query(sql);
}