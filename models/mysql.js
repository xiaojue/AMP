/**
 * @author spring
 * @fileoverview 连接数据库并且重写GET POST DELETE PUT方法
 * @date 2016-04-29
 */
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
function addQuote(value){
    var reg = /^['"]/gi;
    if(!reg.test(value)){
        value = "'" + value + "'";
    }
    return value;
}
const DecSql = {
    GET: (sql,values)=> {
        let str = '';
        for(let key in values){
            if(!values[key]){continue;}
            str += key + " = " + addQuote(values[key]) + " and ";
        }
        if(str){
            str = str.slice(0,-4);
            sql += ' where ' + str;
        }
        return sql;
    },
    POST: (sql,values)=> {
        let fields = [],
            vals = [];
        for(let key in values){
            if(!values[key] || key === 'files'){continue;} //TODO  files 处理的是POSTMAN默认的字段
            fields.push(key);
            vals.push(addQuote(values[key]));
        }
        if(fields.length){
            sql += " (" + fields.join(",") + ")" + " values (" + vals.join(",") + ")";
        }
        return sql;
    },
    PUT: (sql,values,options)=> {
        let fields = [],
            conditions = [],
            params = options.params;
        for(let key in values){
            if(!values[key] || key === 'files'){continue;}
            fields.push(key + " = " + addQuote(values[key]));
        }
        if(params){
            for(let key in params){
                conditions.push(key + ' = ' + addQuote(params[key]));
            }
        }
        fields.length ? sql += ' set ' + fields.join(" and ") : '';
        conditions.length ? sql += ' where ' + conditions.join(" and ") : '';
        return sql;
    },
    DELETE: (sql,values,options)=> {
        let params = options.params,
            conditions = [];
        if(params){
            for(let key in params){
                conditions.push(key + " = " + addQuote(params[key]));
            }
        }
        conditions.length ? sql += " where " + conditions.join(" and ") : '';
        return sql;
    }
}
module.exports.query = function(sql,values,options){
    sql = DecSql[options.type](sql,values,options);
    console.log(sql);
    return p.query(sql);
}