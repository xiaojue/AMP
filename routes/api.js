var mysql = require("../models/mysql");

module.exports = function(Router){
    Router.get("/abc",function(req,res){
        var promise = mysql.querys("select * from collection");
        promise.then(function(value){
            res.send(value);
        }).then(function(value){
            res.send(value);
        });
    });
    return Router;
}