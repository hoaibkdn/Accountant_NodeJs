var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash    = require('connect-flash');
var mongoose = require('mongoose');
const configDb = require('./config/database.js');

var user = require('./web/controllers/user');
var SiteController = require('./web/controllers/SiteController');
var NhapKhoController = require('./web/controllers/NhapKhoController');
var BaoCaoController = require('./web/controllers/BaoCaoController');
var TaiKhoanController = require('./web/controllers/TaiKhoanController');
var NhaCungCapController = require('./web/controllers/NhaCungCapController');
var PhieuChiController = require('./web/controllers/PhieuChiController');
var SoQuyTienMatController = require('./web/controllers/SoQuyTienMatController');
var DanhSachTKController = require('./web/controllers/DanhSachTKController');

var app = express();
mongoose.connect(configDb.url);

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// using session
app.use(session({
    cookieName: 'session',
    secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
    duration: 30*60*10000,
    activeDuration: 5*60*10000,
    httpOnly: true,
    secure: true,
    ephemeral: true,
    resave: true,
    saveUninitialized: true
}));

// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./config/passport')(passport); // pass passport for configuration

//set view engine to ejs
app.set('views', path.join(__dirname, 'web/views'));
app.set('view engine', 'ejs');

app.use('/user', user);
// routing controllers
app.get('/', SiteController.homepage);
app.get('/kttt_pnk', NhapKhoController.createPhieuNhapKho);
app.post('/kttt_pnk', NhapKhoController.submitCreatePhieuNhapKho);
app.get('/locsocai', BaoCaoController.viewFilterSoCai);
app.get('/locsocai/yeucauTK', TaiKhoanController.getTaiKhoanJSON);
app.get('/locsocai/yeucauNCC', NhaCungCapController.getNhaCungCapJSON);
app.get('/phieuchitienmat', PhieuChiController.viewFormPhieuChi);
app.post('/submitphieuchi', PhieuChiController.submitPhieuChi);
app.get('/soquytienmat', SoQuyTienMatController.viewSoQuyTienMat);
app.get('/danhsachtaikhoan', DanhSachTKController.viewDSTK);

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
