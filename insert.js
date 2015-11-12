var i = 0;

function insert() {
	var mongodb = require('mongodb');
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/haohuola';
	MongoClient.connect(url, function(err, db) {
		if (err) {
			setTimeout(function() {
				insert();
			}, 2000);
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
			console.log('Connection established to', url);
			var collection = db.collection('post');
			var time = new Date().getTime();
			var content = '双11明天就到，聚美优品官方目前在度放出了一张50元的无门槛现金券，领取的方法和之前，输入手机号，提交验证码，然后在聚美的APP端首页就能看到入口（下拉一点，点击微博报名）。 <br /><br />此券同样是等到双11当天的零点使用，目前还没放出单品，不过券已经可以开始提前领取了，还没下载APP的赶紧吧。<br /><br />慢慢买神价格推送13群：334213266<strong>（第一时间推送各种神价格、神券，你懂的）</strong><br /><br /><img src="http://7xippu.com1.z0.glb.clouddn.com/hao/1447135733288194.jpg" alt="" /><br /><br /><img src="http://7xippu.com1.z0.glb.clouddn.com/hao/1447135734511128.jpg" alt="" />';
			var post = {
				'id': time,
				'time': time,
				'title': '聚美优品：50元现金券 提前领取 双11当天零点启用',
				'content': content,
				'short_content': content.substr(0, 100).replace(/<[^>].*?>/g, ""),
				'article_title': '聚美优品：50元现金券 提前领取',
				'author': '慢慢买',
				'link': 'http://h5.jumei.com/activity/free/bm',
				'mall': '聚美优品',
				'thumbnail': 'http://7xippu.com1.z0.glb.clouddn.com/hao/1447135734591376.jpg?imageView2/1/w/160/h/160',
				'price': '双11当天零点启用',
				'tag': '其它类别, 聚美优品',
				'country': 'CN',
				'istmall': 1,
				'istaobao': 0,
				'category': 'daily',
				'mobile': 'http://h5.jumei.com/activity/free/bm'
			}
			collection.insert(post, function(err, result) {
				if (err) {
					console.log(err);
					setTimeout(function() {
						insert();
					}, 2000);
				} else {
					console.log('success');
					console.log(i);
					i += 1;
					insert();
				}
				db.close();
			})
		}
	});

}


insert();