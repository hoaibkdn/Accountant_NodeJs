var ChungTu = require('../models/chungtu');
var loggedIn = require('../helpers/loggedIn');

module.exports = {
	createPhieuNhapKho: function(req, res, next) {
		res.render('pages/phieuNhapKho', {user: req.user});
	},

	submitCreatePhieuNhapKho: function(req, res, next) {
		var ctReceived = req.body;
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
		for (let i in ctReceived.cacChiTiet) {
			let chitiet = ctReceived.cacChiTiet[i];
			let obj = {}
			obj.dienGiai = chitiet.dienGiai;
			obj.mauSoHangHoa = chitiet.mauSoHangHoa;
			obj.tienTe = {};
			obj.tienTe.loaiTienTe = chitiet.loaiTienTe;
			obj.tienTe.tyGiaTienTe = chitiet.tyGiaTienTe;
			obj.soLuong = chitiet.chung.soLuong;
			obj.donGia = chitiet.chung.donGia;
			// TODO: fix to number
			// obj.giaTriThueSuat = chitiet.hd.giaTriThueSuat;
			obj.giaTriThueSuat = 0;
			obj.cacTaiKhoan = [];
			// TODO: add cacTaiKhoan
			chungtu.cacChiTiet[i] = obj;
		}
		console.log(ctReceived);
		console.log(chungtu);

		chungtu.save(function(err){
			if (err) {
			  	console.log(err);
			  	next(err)
			}
			else {
			  	res.redirect('/kttt_pnk');
			}
		});
	}
}