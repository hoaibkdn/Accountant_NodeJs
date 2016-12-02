var Chungtu = require('../models/chungtu');

module.exports = {
	viewFilterSoCai: function(req, res, next) {
		var maNhaCungCap = req.param("nhaCungCap");
		var maTaiKhoan = req.param("idTaiKhoan");
		var tenTK = req.param("tenTK");
		console.log('maNhaCungCap: ', maNhaCungCap);
		console.log('maTaiKhoan: ', maTaiKhoan);
		Chungtu.find({
			'loaiChungTu': 'Nhap Kho',
			'nhaCungCap.maNhaCC': maNhaCungCap,
			'cacChiTiet.cacTaiKhoan.idTaiKhoan': maTaiKhoan
		}, function(err, baocao) {
		  	console.log(baocao);
		  	var dsDate = [];
		  	for(var i=0; i<baocao.length; i++){
		  		var formatDate;
		  		var day = baocao[i].ngayChungTu.getDay();
		  		var month = baocao[i].ngayChungTu.getMonth();
		  		var year = "2016";
		  		formatDate = day+"/"+month+"/"+year;
		  		console.log("formatDate "+formatDate);
		  		dsDate.push(formatDate);
		  	}
		  	// var bcjs = JSON.stringify(baocao);
		  	if(err) next(err);
		  	else{
		  		res.render('pages/soCaiTaiKhoan',
		  		{ 
		  			user: req.user,
		  			baocao: baocao,
		  			maTaiKhoan: maTaiKhoan,
		  			tenTaiKhoan: tenTK,
		  			dsDate: dsDate
		  		});
	  		}
	  	});			
	}
}