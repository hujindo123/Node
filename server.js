var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var play = require('./routes/play');
var main = require('./routes/main');
var login = require('./routes/user/login');
var account = require('./routes/user/account');

var angular = require('./routes/angular-ui-router/main');
var PageTab = require('./routes/angular-ui-router/PageTab');
var Page1 = require('./routes/angular-ui-router/Page1');
var Page2 = require('./routes/angular-ui-router/Page2');
var Page3 = require('./routes/angular-ui-router/Page3');


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/*app.use(logger('dev'));*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/lib",express.static(path.join(__dirname, 'node_modules')));

app.use(cookieParser('secret'));

app.use(session({
  secret: 'secret', //一个String类型的字符串，作为服务器端生成session的签名。与cookieParser中的一致
  resave: true,//:(是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。
  saveUninitialized:true,//初始化session时是否保存到存储。默认为true， 但是(后续版本)有可能默认失效，所以最好手动添加。
  cookie: {
    maxAge: 1000*60*30
  }
}));

app.use('/', main);
app.use('/play', play);
app.use('/account', account);
app.use('/login', login);

app.use('/angular', angular);
app.use('/PageTab', PageTab);
app.use('/Page1', Page1);
app.use('/Page2', Page2);
app.use('/Page3', Page3);

app.post('/add', login);
app.post('/getPic', login);
app.post('/search', main);//搜索歌曲
app.post('/searchUrl', main); //搜索歌曲地址







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
'use strict'
function Get_Max_Image_Size(){
  var MAX_IMAGE_SIZE = 1024*1024; // 1 MB
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
