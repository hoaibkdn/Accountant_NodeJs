var ChungTu = require('../models/chungtu');
var loggedIn = require('../helpers/loggedIn');

module.exports = {
	createPhieuNhapKho: function(req, res, next) {
		res.render('pages/phieuNhapKho', {user: req.user});
	},

	submitCreatePhieuNhapKho: function(req, res, next) {
		var ctReceived = req.body;
		var arr_idTK = ["155","331","1331", "331"];
		console.log("arr_idTK "+arr_idTK[1]);
		console.log("req.body "+ctReceived);
		var chungtu = new ChungTu();
		chungtu.loaiChungTu = "Nhap Kho";
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
			obj.giaTriThueSuat = chitiet.hd.giaTriThueSuat;
			// obj.giaTriThueSuat = ;
			obj.cacTaiKhoan = [];

			// TODO: add cacTaiKhoan
			for(var j=0; j<4; j++){
			// 	//var taiKhoan = chitiet.cacTaiKhoan[j];
				var objTK = {}
				objTK.idTaiKhoan = arr_idTK[j];
				// console("taikhoan: "+ objTK.idTaiKhoan );
				switch(j){
					case 0: objTK.tkNo = chitiet.chung.soLuong * chitiet.chung.donGia * chitiet.tyGiaTienTe; 
							objTK.tkCo = 0;
							break;
					case 1: objTK.tkCo = chitiet.chung.soLuong * chitiet.chung.donGia * chitiet.tyGiaTienTe; 
							objTK.tkNo = 0;
							break;
					case 2: objTK.tkNo = chitiet.chung.soLuong * chitiet.chung.donGia * chitiet.hd.giaTriThueSuat; 
							objTK.tkCo = 0;
							break;
					case 3: objTK.tkCo = chitiet.chung.soLuong * chitiet.chung.donGia * chitiet.hd.giaTriThueSuat; 
							objTK.tkNo = 0;
							break;
				}
				obj.cacTaiKhoan[j] = objTK;
			// 	console.log("taiKhoan "+objTK);
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