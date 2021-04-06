//실행방법 set DEBUG=myapp:* & npm start
var createError = require('http-errors');
var express = require('express');
const mysql = require('./db');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// db 연결
mysql.connect();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json()); // 2
app.use(bodyParser.urlencoded({extended:true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// 에러 캐치 catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 에러 핸들러 error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
