var Chungtu = require('../models/chungtu');

module.exports = {
	viewSoQuyTienMat: function(req, res, next) {
		var today = new Date();
		Chungtu.find({
			'cacChiTiet.cacTaiKhoan.idTaiKhoan': "111",
			'loaiChungTu':"ChiTienMat"
		}, function(err, baocao) {
		  	console.log(baocao);
		  	if(err) next(err);
		  	else{
		  		res.render('pages/soQuyTienMat',
		  		{ 
		  			user: req.user,
		  			baocao: baocao,
		  			tenTaiKhoan: "Tiền mặt",
		  			today: today
		  		});
	  		}
	  	});			
	}
}