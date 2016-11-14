var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var home = require('./routes/home');
var index = require('./routes/index');
var login = require('./routes/login');
var kttt_pnk = require('./routes/kttt_phieuNhapKho');
var nhap_phieuKho = require('./routes/nhap_phieuKho');

var app = express();

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup - jade
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// using session
app.use(session({
    cookieName: 'session',
    secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
    duration: 30*60*1000,
    activeDuration: 5*60*1000,
    httpOnly: true,
    secure: true,
    ephemeral: true,
    resave: true,
    saveUninitialized: true
}));
app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

// view engine setup - handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

//set view engine to ejs
app.set('view engine', 'ejs');
app.use('/', index);
app.use('/user', login);
app.use('/kttt_pnk', kttt_pnk);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
