var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/haohuola';
var perPageNumber = 20;
var categorys=[
	{name:'all',value:'全部折扣',find:/.*/},
	{name:'daily',value:'日用百货',find:'daily'},
	{name:'food',value:'食品生鲜',find:'food'},
	{name:'clothes',value:'服饰鞋包',find:'clothes'},
	{name:'beauty',value:'美妆个护',find:'beauty'},
	{name:'sports',value:'运动健康',find:'sports'},
	{name:'tech',value:'数码家电',find:'tech'},
	{name:'baby',value:'母婴玩具',find:'baby'},
	{name:'books',value:'图书音像',find:'books'},
	{name:'others',value:'其它类别',find:'others'}
];
var malls=[
	{name:'all',value:'全部商城',find:/.*/},
	{name:'tmall',value:'天猫商城',find:'天猫商城'},
	{name:'jd',value:'京东商城',find:'京东商城'},
	{name:'amazon',value:'亚马逊中国',find:'亚马逊中国'},
	{name:'taobao',value:'淘宝网',find:'淘宝网'},
	{name:'yixun',value:'易迅网',find:'易迅网'},
	{name:'suning',value:'苏宁易购',find:'苏宁易购'},
	{name:'yhd',value:'1号店',find:'1号店'},
	{name:'jianyi',value:'健一网',find:'健一网'},
	{name:'kaola',value:'考拉海购',find:'考拉海购'},
	{name:'dangdang',value:'当当网',find:'当当网'},
	{name:'guomei',value:'国美在线',find:'国美在线'},
	{name:'shunfeng',value:'顺丰海淘',find:'顺丰海淘'},
	{name:'hangou',value:'汉购网',find:'汉购网'},
]
var mallName = {
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
	'shunfeng': '顺丰海淘',
	'hangou':'汉购网'
}
exports.run = function(req, res,route) {
	var mall=Cookie.get(req,'mall');
	var cate=Cookie.get(req,'cate');
	if(mall=='all'){
		mall=/.*/;
	}else{
		mall=mallName[mall];
	}
	if(cate=='all'){
		cate=/.*/;
	}
	if(!mall){
		mall=/.*/;
	}
	if(!cate){
		cate=/.*/;
	}
	switch(route){
		case 'cn':
			var display='none';
			var query={country:'CN'};
			break;
		case 'home':
			var query={category:cate,mall:mall};
			var display='block';
			break;
		case 'haitao':
			var display='none';
			var query={country:'US'};
			break;
		case 'baicai':
			var display='none';
			var query={tag:/.*白菜价.*/};
			break;
	}
	try{
		var page = req.params.page;
		if(typeof(page)==="undefined"){
			page=1;
		}
	}catch(e){
		var page=1;
	}
	if(page<1||!isInt(page)){
		res.send('<h1 style="text-align:center;font-weight:200;font-size:6em;margin-top:100px;">404<br><span style="font-size:30px;">Not Found</span></h1>', 404);
	}
	page=parseInt(page);
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
					getUpdateNumber(collection, function(updateItems) {
						getPage(collection,query,page,function(pages){
							if(pages==404){
								res.send('<h1 style="text-align:center;font-weight:200;font-size:6em;margin-top:100px;">404<br><span style="font-size:30px;">Not Found</span></h1>', 404);
								return false;
							}else{
								res.render('index', {
									mall: 'all',
									cate:'all',
									page: page,
									items: result,
									updateItems: updateItems,
									mallItems:malls,
									categorys:categorys,
									display:display,
									route:route,
									pages:pages
								});
							}
						});
					})
				}
			})
		}
	})
}

function getUpdateNumber(collection, callback) {
	var D = new Date();
	var day = D.getFullYear() + '' + (D.getMonth() + 1) + '' + D.getDate();
	collection.aggregate([{
		$match: {
			day: day
		}
	}, {
		$group: {
			_id: "$author",
			num: {
				$sum: 1
			}
		}
	}]).sort({
		'num': -1
	}).toArray(function(err, result) {
		if (err) {
			callback([]);
		} else {
			callback(result);
		}
	})
}
function getPage(collection,query,page,callback){
	collection.count(query,function(err,num){
		var pages=[];
		if(num===0){
			num=1;
		}
		var maxPage=Math.ceil(num/perPageNumber);
		if(page>maxPage||page<1){
			callback(404);
		}else{
			var start=page-3<1?1:page-3;
			var end=page+3>maxPage?maxPage:page+3;
			for (var i = start; i < page; i++) {
				pages.push({name:i,page:i,type:'link'})
			}
			for (var i = page; i <= end; i++) {
				pages.push({name:i,page:i,type:'link'})
			}
			if(pages[0].page!=1){
				pages.unshift({name:1,page:1,type:'link'},{name:'...',page:'...',type:'span'});
			}
			if(pages[pages.length-1].page!=maxPage){
				pages.push({name:'...',page:'...',type:'span'},{name:maxPage,page:maxPage,type:'link'});
			}
			if(page>1){
				pages.unshift({name:'上页',page:page-1,type:'link'})
			}
			if(page<maxPage){
				pages.push({name:'下页',page:page+1,type:'link'})
			}
			callback(pages);
		}
	});
}


var Cookie = {
	get: function(req, name) {
		var cookies = {};
		var cookieString = req.headers.cookie;
		try {
			var pairs = cookieString.split(/[;,] */);
			for (var i = 0; i < pairs.length; i++) {
				var idx = pairs[i].indexOf('=');
				var key = pairs[i].substr(0, idx);
				var val = pairs[i].substr(++idx, pairs[i].length).trim();
				cookies[key] = val;
			}
			return cookies[name];
		} catch (e) {
			return '';
		}

	}
}


function isInt(a){
	try{
		var c=a.toString();
		var b=parseInt(a);
		var d=b.toString();
		if(c===d){
			return true;
		}else{
			return false;
		}
	}catch(e){
		return false;
	}
}
