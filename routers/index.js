/**
 * @date 2016-04-26
 * @fileoverview 页面路由配置
 */
var express = require('express');
var router = express.Router();

var routers = [
	router.get("/",function(req,res){
		req.models.Collection.find({}, function(err,response){
			var list = [];
			if(!err && response){
				list = response;
			}
			res.render('index',{
				list: list
			});
		});
	})
]
routers = routers.concat(require("./api")(router));

module.exports = routers;