var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
const util = require('util');
/* GET home page. */
console.log("Bullshit");
router.post('/login', function(req, res, next) {
	console.log(util.inspect(req.body, false, null));
	var json = JSON.stringify(req.body, null, 2);
	console.log(json);
	var user = JSON.parse(json);
  var username = user.username;
  var password = user.password;
  console.log(username + "  " + password);
  var url = 'mongodb://localhost:27017/accountant';
  mongodb.MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Connect DB fail', err);
    } else {
      console.log("connect done");
      var collection = db.collection('NGUOIDUNG');
      collection.findOne({tenDangNhap: username, matKhau: password}, function (err, keToanThanhToan) {
      	console.log(keToanThanhToan);
        if (err) {
        	console.log(err);
          res.send(err);
        } else if (keToanThanhToan) {
        	console.log("session "+req.session);
          req.session.username = username;
          req.session.role = keToanThanhToan.role;
          console.log(req.session.username);
          res.redirect('/');
        } else {
        	console.log("Else");
          res.redirect('/');
        }
      });
    }
  });

 });

module.exports = router;
