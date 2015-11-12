var express = require('express');
var routes=require('./routes/index.js');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine','ejs');//模板引擎
app.use(express.static(__dirname + '/static'));//静态文件夹

//以下是路由
app.get('/',routes.index);
app.get('/page/:page',routes.index);
app.get('/publish',routes.notFound);
app.post('/publish',routes.publish);
app.get('/post/:id',routes.post);
var server = app.listen(3100, function() {
    console.log('Listening on port %d', server.address().port);
});