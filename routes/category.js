var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/haohuola';
var perPageNumber = 20;
var categorys=[
	{'name':'all','value':'全部折扣'},
	{'name':'daily','value':'日用百货'},
	{'name':'food','value':'食品生鲜'},
	{'name':'clothes','value':'服饰鞋包'},
	{'name':'beauty','value':'美妆个护'},
	{'name':'sports','value':'运动健康'},
	{'name':'tech','value':'数码家电'},
	{'name':'baby','value':'母婴玩具'},
	{'name':'books','value':'图书音像'},
	{'name':'others','value':'其它类别'}
]
exports.run = function(req, res) {
	var name = req.params.name;
	if (name !== 'cn' && name !== 'haitao' && name !== 'daily' && name !== 'food' && name !== 'clothes' && name !== 'beauty' && name !== 'sports' && name !== 'tech' && name !== 'baby' && name !== 'books' && name !== 'others') {
		res.send('<h1 style="text-align:center;font-weight:200;font-size:6em;margin-top:100px;">404<br><span style="font-size:30px;">Not Found</span></h1>', 404);
		return false;
	}
	var page = req.params.page;
	var query;
	if (name === 'cn' || name === 'haitao') {
		if (name == 'cn') {
			query = {
				'country': 'CN'
			};
		} else {
			query = {
				'country': 'US'
			};
		}
	} else {
		query = {
			'category': name
		};
	}
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
						cate:name,
						page: page,
						items: result,
						updateItems: [],
						mallItems: [],
						categorys:categorys
					});
				}
			})
		}
	})
}