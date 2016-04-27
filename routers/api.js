/**
 * @fileoverview api
 * @date 2016-04-27
 */
module.exports = function(Router){
	Router = Router.get("/api/collection",function(req,res){
		console.info(req.query);
		req.models.Collection.find(req.query,function(err,response){
			res.send(err || response);
		})
	});
	Router = Router.post("/api/collection",function(req,res){
		console.log(req.body);
		req.models.Collection.create(req.body,function(err,response){
			res.send(err || response);
		})
	});
	return Router;
}
