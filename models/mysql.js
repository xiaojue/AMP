/**
 * @fileoverview orm for database
 * @date 2016-04-26
 */

var orm = require('orm');
var config = require('../db/config.json');
var db = require('../db/mysql.json');
var mysql = db[config.db];

function connect(app){
	app.use(orm.express('mysql://' + mysql.username + ':' + mysql.pwd + '@' + mysql.host + '/' + mysql.database + '?timezone=CST',{
	    	define : function(db, models, next) {
	      		db.settings.set('instance.cache', false);
	      		models.Collection = db.define("collection",{
//	      			id: {type: 'number', key: true},
	      			name: String
	      		})
				next();
	      	}
	    }
	));
}
module.exports = connect;
