var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/haohuola';
var perPageNumber=20;
exports.index = function(req, res) {
	//首页
	var home=require('../routes/home');
	home.run(req,res,'home');
}
exports.publish = function(req, res) {
	var publish=require('../routes/publish');
	publish.run(req,res);
}
exports.post = function(req, res) {
	var post=require('../routes/post');
	post.run(req,res);
}
exports.category = function(req, res) {
	var category=require('../routes/category');
	category.run(req,res);
}
exports.search = function(req, res) {
	var search=require('../routes/search');
	search.run(req,res);
}
exports.mall = function(req, res) {
	var mall=require('../routes/mall');
	mall.run(req,res);
}
exports.cn = function(req, res) {
	var home=require('../routes/home');
	home.run(req,res,'cn');
}
exports.haitao = function(req, res) {
	var home=require('../routes/home');
	home.run(req,res,'haitao');
}
exports.baicai = function(req, res) {
	var home=require('../routes/home');
	home.run(req,res,'baicai');
}
exports.notFound = function(req, res) {
	res.send('<h1 style="text-align:center;font-weight:200;font-size:6em;margin-top:100px;">404<br><span style="font-size:30px;">Not Found</span></h1>', 404);
}