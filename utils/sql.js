/**
 * @fileoverview 拆分sql参数,与type对应
 */

function addQuote(value){
    var reg = /^['"]/gi;
    if(!reg.test(value)){
        value = "'" + value + "'";
    }
    return value;
}

module.exports = {
    GET: (sql,values)=> {
        let str = '',
            reserved = ['pageIndex','pageSize']; //预留的一些字段不在这里进行处理
        for(let key in values){
            if(!values[key] || reserved.indexOf(key) >=0){continue;}
            str += key + " = " + addQuote(values[key]) + " and ";
        }
        if(str){
            str = str.slice(0,-4);
            sql += ' where ' + str;
        }
        if(values['pageSize']){
            let index = values['pageIndex'] || 0,
                pageSize = values['pageSize'];
            sql += " limit " + index*pageSize + "," + pageSize;
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
};
