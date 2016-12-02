var Chungtu = require('../models/chungtu');

module.exports = {
	viewSoQuyTienMat: function(req, res, next) {
		var today = new Date();
		Chungtu.find({
			'cacChiTiet.cacTaiKhoan.idTaiKhoan': "111",
			'loaiChungTu':"ChiTienMat"
		}, function(err, baocao) {
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
		  	console.log(baocao);
		  	if(err) next(err);
		  	else{
		  		res.render('pages/soQuyTienMat',
		  		{ 
		  			user: req.user,
		  			baocao: baocao,
		  			tenTaiKhoan: "Tiền mặt",
		  			today: today,
		  			dsDate: dsDate
		  		});
	  		}
	  	});			
	}
}