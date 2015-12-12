var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/haohuola';
var perPageNumber = 20;
exports.run = function(req, res) {
	var page = req.params.page;
	var word=req.params.word;
	if(!word){
		res.send('您要找点什么？');
		return false;
	}
	var reg=new RegExp(word);
	var query={'title':reg};
	var page = parseInt(req.params.page);
	if (!page) {
		page = 1;
	}
	var start = (page - 1) * perPageNumber;
	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
			var collection = db.collection('post');
			collection.find(query).sort({
				'id': -1
			}).skip(start).limit(perPageNumber).toArray(function(err, result) {
				if (err) {
					console.log('find post error');
				} else {
					res.render('index', {
						mall:'all',
						page: page,
						items: result,
						updateItems: [],
						mallItems: []
					});
				}
			})
		}
	})
}