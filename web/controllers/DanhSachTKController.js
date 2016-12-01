var NguoiDung = require('../models/nguoidung');
var ChungTu = require('../models/chungtu');

module.exports = {

	viewDSTK: function(req, res, next) {

		//find all chung tu
		ChungTu.find({
		}, function(err, chungtu) {
		  	console.log(chungtu);
		  	var val155 = 0, 
		  		valNo331 = 0, 
		  		valCo331 = 0, 
		  		val1331 = 0, 
		  		val111 = 0;
		  	for(var i = 0; i < chungtu.length; i++) {
		  		for(var j = 0; j < chungtu[i].cacChiTiet.length; j++){
		  			if(chungtu[i].cacChiTiet[j].cacTaiKhoan[0].idTaiKhoan == "155"){
		  				val155 += chungtu[i].cacChiTiet[j].cacTaiKhoan[0].tkNo;
		  				console.log("tai khoan 155: "+val155);
		  			}
		  			if(chungtu.loaiChungTu == "Nhap Kho"){
		  				if(chungtu[i].cacChiTiet[j].cacTaiKhoan[2].idTaiKhoan == "1331"){
			  				val1331 += chungtu[i].cacChiTiet[j].cacTaiKhoan[2].tkNo;
			  				console.log("tai khoan 1331: "+val1331);
			  			}
		  			}
		  			if(chungtu[i].cacChiTiet[j].cacTaiKhoan[1].idTaiKhoan == "331"){
		  				valNo331 += chungtu[i].cacChiTiet[j].cacTaiKhoan[1].tkNo;
		  				valCo331 += chungtu[i].cacChiTiet[j].cacTaiKhoan[1].tkCo;
		  				console.log("tai khoan 331 co: "+valCo331);
		  				console.log("tai khoan 331 no: "+valNo331);
		  			}
		  			if(chungtu[i].cacChiTiet[j].cacTaiKhoan[1].idTaiKhoan == "111"){
		  				console.log("id");
		  				val111 += chungtu[i].cacChiTiet[j].cacTaiKhoan[1].tkCo;

		  				console.log("tai khoan 111: "+val111);
		  			}
		  		}
		  	}
		  	console.log("tai khoan 155: "+val155);
		  	if(err) next(err);
		  	else{
		  		res.render('pages/danhSachTaiKhoanKTT',
		  		{ 
		  			user: req.user,
		  			val155: val155,
		  			valCo331: valCo331,
		  			valNo331: valNo331,
		  			val1331: val1331,
		  			val111: val111
		  		});
	  		}
	  	});	
	},

	guiPhanHoi: function(req, res, next){
		NguoiDung.update(
			{'tenDangNhap': "ketoanthanhtoan"},
			{ $set:{'phanHoi': 1}},
			function(err, nguoidung){
				if(err) console.log(err);
				else res.redirect('/danhsachtaikhoan');
			}
		)
	}
}