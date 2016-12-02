var Chungtu = require('../models/chungtu');

module.exports = {
	viewSoQuyTienMat: function(req, res, next) {
		var today = new Date();
		Chungtu.find({
			'cacChiTiet.cacTaiKhoan.idTaiKhoan': "111",
			'loaiChungTu':"ChiTienMat"
		}, function(err, baocao) {
			// var dateTime = new Date("2015-06-17 14:24:36");
			// dateTime = moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
			// console.log("dateTime "+dateTime);
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