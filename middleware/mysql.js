/**
 * @fileoverview koa2 mysql middleview
 */

import mysqlPool from '../models/mysql';
import mysql from 'mysql'

module.exports = async function(ctx, next) {
    var db = mysqlPool();
    ctx.mysqlQuery = function(table){
        return {
            get: function(attrs,opts){
                var query = '',columns = "*";
                if(opts && opts.columns){
                    columns = mysql.escapeId(opts.columns);
                }
                if(opts && opts.or){
                    query = orEscape("SELECT " + columns + " FROM " + table + " WHERE ??", attrs);
                }else{
                    query = andEscape("SELECT " + columns + " FROM " + table + " WHERE ??", attrs);
                }
                if (opts && opts.order) {
                    query += ' ORDER BY ' + mysql.escape(opts.order);
                }
                if (opts && opts.order && opts.desc) {
                    query += ' DESC ';
                }
                if (opts && opts.limit) {
                    query += ' LIMIT ' + mysql.escape(opts.limit);
                }
                if (opts && opts.limit && opts.offset) {
                    query += ' OFFSET ' + mysql.escape(opts.offset);
                }
                return execute(query,db);
            },
            post: function(attrs){
                var query = andEscape("INSERT INTO " + table + " SET ??",attrs,',');
                return execute(query,db);
            },
            put: function(attrs,sel){
                var query = andEscape('UPDATE ' + table + " SET ??", attrs,',');
                query = andEscape(query + " WHERE ??",sel);
                return execute(query,db);
            },
            delete: function(attrs){
                var query = andEscape("DELETE FROM " + table + " WHERE ??", attrs);
                return execute(query,db);
            }
        }
    }
    await next();
    db.pool.end();
};
var execute = function(query,db){
    console.log(query);
    try{
        return db.client.query(query);
    }catch(err){
        return err;
    }
}
/*AND ,*/
var andEscape = function(query, values,separator) {
    return query.replace(/\?\?/g, function(txt) {
        if ((typeof values) !== 'object') {
            throw new Error("Can only escape objects");
        }
        var rtn = [],
            key = '',
            cnt = 0;
        for (key in values) {
            if (values.hasOwnProperty(key) && key !== 'files') {
                cnt += 1;
                rtn.push(mysql.escapeId(key) + ' = ' + mysql.escape(values[key]));
            }
        }
        if (cnt === 0) {
            return '1';
        }
        separator = separator || ' AND '
        return rtn.join(separator);
    });
};
/* OR */
var orEscape = function(query, values) {
    return query.replace(/\?\?/g, function(txt) {
        if ((typeof values) !== 'object') {
            throw new Error("Can only escape objects");
        }
        var rtn = [],
            key = '',
            cnt = 0;
        for (key in values) {
            if (values.hasOwnProperty(key) && key !== 'files') {
                cnt += 1;
                rtn.push(mysql.escapeId(key) + ' like ' + mysql.escape("%" + values[key] + "%"));
            }
        }
        if (cnt === 0) {
            return '1';
        }
        return rtn.join(' OR ');
    });
};