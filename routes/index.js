var items = [{
	title: '文章1'
}, {
	title: '文章2'
}];
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/haohuola';
var perPageNumber=20;
exports.index = function(req, res) {
	var page=parseInt(req.params.page);
	if(page){
		
	}else{
		var page=1;
	}
	var start=(page-1)*perPageNumber;
	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
			var collection = db.collection('post');
			collection.find().skip(start).limit(perPageNumber).sort({'id':-1}).toArray(function(err,result){
				if(err){
					console.log('find post error');
				}else{
					res.render('index', {
						page:page,
						items:result
					});
				}
			})
		}
	})
}
exports.publish = function(req, res) {
	var key = 'b345MyRtVS5nZT0jeVBNV0RuUEY';
	var secret = 'cUpvLE89aFVdTDBXdH44WEg5c0E';
	var the_key = req.body.key; //key
	var the_secret = req.body.secret; //密钥
	if (!(key == the_key && secret == the_secret)) {
		res.send('Unauthenticated');
		return false;
	}
	var title = req.body['publish-title']; //文章标题
	var content = req.body['publish-content']; //文章内容
	var article_title = req.body['article-title'];
	var author = req.body.fromauthor; //从哪个网站抓取的
	var link = req.body.links; //购买链接
	var mall = req.body.mall; //哪个商城
	var thumbnail = req.body.image; //缩略图
	var price = req.body.price; //价格
	var tag = req.body.tag; //标签
	var country = req.body.country; //国内、海淘
	var istmall = req.body.istmall;
	var istaobao = req.body.istaobao;
	var category = req.body.category;
	var mobile = req.body.mobile;

	MongoClient.connect(url, function(err, db) {
		if (err) {
			res.send('error',200);
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
			console.log('Connection established to', url);
			var collection = db.collection('post');
			var time=new Date().getTime();
			var post = {
				'id':time,
				'time':time,
				'title': title,
				'content': content,
				'short_content':content.substr(0,100).replace(/<[^>].*?>/g,""),
				'article_title': article_title,
				'author': author,
				'link': link,
				'mall': mall,
				'thumbnail': thumbnail,
				'price': price,
				'tag': tag,
				'country': country,
				'istmall': istmall,
				'istaobao': istaobao,
				'category': category,
				'mobile': mobile
			}
			collection.insert(post, function(err, result) {
				if (err) {
					console.log(err);
				} else {
					//console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
				}
				db.close();
			})
		}
	});
	res.send('',200);
}
exports.post = function(req, res) {
	var id=parseInt(req.params.id);
	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
			var collection = db.collection('post');
			collection.find({'id':id}).limit(1).toArray(function(err,result){
				if(err){
					console.log('find post error');
				}else{
					if(result.length>0){
						var post=result[0];
						res.render('post', {
							'title':post.title,
							'content':post.content,
							'time':post.time,
							'link':post.link,
							'tags':post.tag
						});
					}else{
						res.send('<h1 style="text-align:center;font-weight:200;font-size:6em;margin-top:100px;">404<br><span style="font-size:30px;">Not Found</span></h1>', 404);
					}
				}
			})
		}
	})
}
exports.notFound = function(req, res) {
	res.send('<h1 style="text-align:center;font-weight:200;font-size:6em;margin-top:100px;">404<br><span style="font-size:30px;">Not Found</span></h1>', 404);
}