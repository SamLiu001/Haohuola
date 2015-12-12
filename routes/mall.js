var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/haohuola';
var perPageNumber = 20;
var malls = {
	'tmall': '天猫商城',
	'jd': '京东商城',
	'amazon': '亚马逊中国',
	'taobao': '淘宝网',
	'yixun': '易迅网',
	'suning': '苏宁易购',
	'yhd': '1号店',
	'jianyi': '健一网',
	'kaola': '考拉海购',
	'guomei': '国美在线',
	'dangdang': '当当',
	'shunfeng': '顺丰海淘'
}
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
	var page = req.params.page;
	var query = {
		'mall': malls[name]
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
						mall:name,
						cate:'all',
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