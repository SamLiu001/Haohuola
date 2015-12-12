var express = require('express');
var routes=require('./routes/index.js');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine','ejs');//模板引擎
app.use(express.static(__dirname + '/static'));//静态文件夹
app.locals.diffTime=function(time){
	var now=new Date().getTime();
	var diff=now-time;
	var timediff=Math.round(diff/1000);
	var days     = Math.round(timediff / 86400);
    var remain   = timediff % 86400;
    var hours    = Math.round(remain / 3600);
    var remain   = remain % 3600;
    var mins     = Math.round(remain / 60);
    var secs     = remain % 60;
	if(days>10){
		var D=new Date(time);
		var Year=D.getFullYear();
		var Month=D.getMonth()+1;
		var Day=D.getDate();
		var Hours=D.getHours();
		var Minutes=D.getMinutes();
		return 'Year'+'-'+Month+'-'+Day+' '+Hours+':'+Minutes;
	}
	if(days>=1){
		resstr=days+"天前";
		return resstr;
	}
	if(days==0&&hours>=1){
		resstr=hours+"小时前";
		return resstr;
	}
	if(hours==0&&mins>=1){
		resstr=mins+"分钟前";
		return resstr;
	}
	if(mins==0&&secs>=0){
		resstr=secs+"秒前";
		return resstr;
	}
}
//以下是路由
app.get('/',routes.index);
app.get('/page/:page',routes.index);
app.get('/publish',routes.notFound);
app.post('/publish',routes.publish);
app.get('/post/:id',routes.post);
app.get('/search',routes.search);
app.get('/search/:word',routes.search);
app.get('/mall/:name',routes.mall);
/*app.get('/:name',routes.category);
app.get('/:name/:page',routes.category);*/
app.get('/cn',routes.cn);
app.get('/cn/:page',routes.cn);
app.get('/haitao',routes.haitao);
app.get('/haitao/:page',routes.haitao);
app.get('/baicai',routes.baicai);
app.get('*',routes.notFound);
app.post('*',routes.notFound)
var server = app.listen(3100, function() {
    console.log('Listening on port %d', server.address().port);
});