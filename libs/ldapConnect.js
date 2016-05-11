/**
 * @author spring
 * @fileoverview 连接远程users表查询数据
 * @date 2016-05-11
 */
import ldap from 'ldapjs'

const ldapurl = 'ldap://10.69.100.1';
const username = 'yunyingbaobiao';
const password = '5P=/d_Xp';

module.exports = function(callback){
    return new Promise(function(resolve,reject){
        let client = ldap.createClient({
            url: ldapurl,
            timeout: 5000,
            connectTimeout: 10000
        });
        client.bind(username, password, function(err) {
            if (err) {
                //unbind(client, next);
                // ctx.status = 400;
                reject(err);
            } else {
                callback(client,resolve,reject);
            }
        });
    });
}