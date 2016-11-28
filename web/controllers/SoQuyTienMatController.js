var Chungtu = require('../models/chungtu');

module.exports = {
	viewSoQuyTienMat: function(req, res, next) {
		
		Chungtu.find({
			'cacChiTiet.cacTaiKhoan.idTaiKhoan': "111"
		}, function(err, baocao) {
		  	console.log(baocao);
		  	// console.log("chi tiet", baocao[0].soChungTu);
		  	// console.log("bao cao "+baocao);
		  	// var bcjs = JSON.stringify(baocao);
		  	if(err) next(err);
		  	else{
		  		res.render('pages/soQuyTienMat',
		  		{ 
		  			user: req.user,
		  			baocao: baocao,
		  			tenTaiKhoan: "Tiền mặt"
		  		});
	  		}
	  	});			
	}
}