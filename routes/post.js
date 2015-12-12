var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/haohuola';
exports.run = function(req, res) {
	var id = parseInt(req.params.id);
	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
			var collection = db.collection('post');
			collection.find({
				'id': id
			}).limit(1).toArray(function(err, result) {
				if (err) {
					console.log('find post error');
				} else {
					if (result.length > 0) {
						var post = result[0];
						res.render('post', {
							'title': post.title,
							'content': post.content,
							'time': post.time,
							'link': post.link,
							'tags': post.tag
						});
					} else {
						res.send('<h1 style="text-align:center;font-weight:200;font-size:6em;margin-top:100px;">404<br><span style="font-size:30px;">Not Found</span></h1>', 404);
					}
				}
			})
		}
	})
}