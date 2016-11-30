var ChungTu = require('../models/chungtu');

module.exports = {
	viewFormPhieuChi: function(req, res, next) {
		var _id = req.param("id");
		ChungTu.findOne({
			_id : _id
		}, function(err, chungtu) {
			console.log("chungtu "+chungtu);
			console.log("ngay chung tu: "+chungtu.ngayChungTu);
			if(err) next(err);
			else {
				res.render('pages/phieuchitienmat', {
				    user: req.user,
				    chungtu: chungtu
				});
			}
		})
	},

	submitPhieuChi: function(req, res, next) {
		var ctReceived = req.body;
		var arr_idTK = ["331","111"];
		console.log("req.body "+ctReceived);
		var chungtu = new ChungTu();
		chungtu.loaiChungTu = "ChiTienMat";
		chungtu.ngayChungTu = ctReceived.ngayChungTu;
		chungtu.soChungTu = ctReceived.soChungTu;
		chungtu.dienGiai = ctReceived.dienGiai;
		chungtu.nhaCungCap.maNhaCC = ctReceived.nhaCungCap.maNhaCC;
		chungtu.nhaCungCap.tenNhaCC = ctReceived.nhaCungCap.tenNhaCC;
		chungtu.nhaCungCap.diaChi = ctReceived.nhaCungCap.diaChi;
		chungtu.hoaDon.maSoThue = ctReceived.hoaDon.maSoThue;
		chungtu.hoaDon.kyHieuHD = ctReceived.hoaDon.kyHieuHD;
		chungtu.hoaDon.mauSo = ctReceived.hoaDon.mauSo;
		chungtu.hoaDon.ngayHD = ctReceived.hoaDon.ngayHD;
		chungtu.hoaDon.soHD = ctReceived.hoaDon.soHD;
		for (var i in ctReceived.cacChiTiet) {
			var chitiet = ctReceived.cacChiTiet[i];
			var obj = {}
			obj.dienGiai = chitiet.dienGiai;
			obj.mauSoHangHoa = chitiet.mauSoHangHoa;
			obj.tienTe = {};
			obj.tienTe.loaiTienTe = chitiet.loaiTienTe;
			obj.tienTe.tyGiaTienTe = chitiet.tyGiaTienTe;
			obj.soLuong = chitiet.chung.soLuong;
			obj.donGia = chitiet.chung.donGia;

			// TODO: fix to number
			obj.giaTriThueSuat = chitiet.chung.giaTriThueSuat;
			obj.cacTaiKhoan = [];

			// TODO: add cacTaiKhoan
			for(var j=0; j<2; j++){
			// 	//var taiKhoan = chitiet.cacTaiKhoan[j];
				var objTK = {}
				objTK.idTaiKhoan = arr_idTK[j];
				var thanhTien = chitiet.chung.soLuong * chitiet.chung.donGia * chitiet.chung.giaTriThueSuat + chitiet.chung.soLuong * chitiet.chung.donGia;

				switch(j){
					case 0: objTK.tkNo = thanhTien; 
							objTK.tkCo = 0;
							break;
					case 1: objTK.tkCo = thanhTien; 
							objTK.tkNo = 0;
							break;
				}
				obj.cacTaiKhoan[j] = objTK;
			}
			chungtu.cacChiTiet[i] = obj;
		}
		console.log(ctReceived);
		console.log(chungtu);

		chungtu.save(function(err, chungtu){
			if (err) {
			  	console.log(err);
			  	res.json(err);
			}
			else {
			  	res.json(chungtu);
			}
		});
	}
}