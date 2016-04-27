/**
 * @date 2016-04-26
 * @fileoverview main app.js
 */

var express = require('express');
var ejs = require('ejs');
var routers = require('./routers');
var lactate = require('lactate');
var bodyParser = require('body-parser');
var mysql = require('./models/mysql');
var app = express();
var orm = require('orm');

orm.settings.set("connection.pool",true);

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

new mysql(app);
routers.forEach(function(router){
	app.use(router);
});

app.use(lactate.static(__dirname + '/publics'));

var server = app.listen(3000, function() {
	var host = server.address().address;
  	var port = server.address().port;

  	console.log('listening at http://%s:%s', host, port);
});