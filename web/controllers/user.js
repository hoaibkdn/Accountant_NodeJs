var express = require('express');
var router = express.Router();

var passport = require('passport');
var NguoiDung = require('../models/nguoidung');
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/logout', function(req,res){
	console.log("logout");
	req.session.destroy()
	req.logout()
	res.redirect('/')
});

router.post('/xemphanhoi', function(req, res){
	NguoiDung.update(
		{'tenDangNhap': "ketoanthanhtoan"},
		{ $set:{'phanHoi': 0}},
		function(err, nguoidung){
			if(err) console.log(err);
			else res.redirect('/');
		}
	)
});

module.exports = router;