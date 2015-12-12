var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/haohuola';
exports.run = function(req, res) {
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
			var D=new Date();
			var time=D.getTime();
			var day=D.getFullYear()+''+(D.getMonth()+1)+''+D.getDate();
			var post = {
				'id':time,
				'time':time,
				'day':day,
				'title': title,
				'content': content,
				'short_content':handleHtml(content),
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
				'mobile': mobile,
				'view':0
			}
			collection.insert(post, function(err, result) {
				if (err) {
					console.log(err);
				} else {
					//console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
					console.log('success');
				}
				db.close();
			})
		}
	});
	res.send('',200);
}
function handleHtml(str) {
	return str.replace(/<[^>]+>/g, "").replace(/\ +/g,"").replace(/\s+/g,"").replace(/[ ]/g,"").replace(/[\r\n\t]/g,"").substr(0,50)+'...'; //去掉所有的html标记
}