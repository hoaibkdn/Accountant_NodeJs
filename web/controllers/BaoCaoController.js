var Chungtu = require('../models/chungtu');

module.exports = {
	viewFilterSoCai: function(req, res, next) {
		var maNhaCungCap = req.param("nhaCungCap");
		var maTaiKhoan = req.param("idTaiKhoan");
		console.log('maNhaCungCap: ', maNhaCungCap);
		console.log('maTaiKhoan: ', maTaiKhoan);
		Chungtu.find({
			'nhaCungCap.maNhaCC': maNhaCungCap,
			'cacChiTiet.cacTaiKhoan.idTaiKhoan': maTaiKhoan
		}, function(err, baocao) {
		  	console.log(baocao);
		  	// console.log("chi tiet", baocao[0].soChungTu);
		  	// console.log("bao cao "+baocao);
		  	// var bcjs = JSON.stringify(baocao);
		  	if(err) next(err);
		  	else{
		  		res.render('pages/soCaiTaiKhoan',
		  		{ 
		  			user: req.user,
		  			baocao: baocao,
		  			maTaiKhoan: maTaiKhoan,
		  			tenTaiKhoan: "Nguyên vật liệu"
		  		});
	  		}
	  	});			
	}
}