var Taikhoan = require('../models/taikhoan');

module.exports = {
	getTaiKhoanJSON: function(req, res, next) {
		Taikhoan.find(function(err, taikhoans) {
			if (err) return err;
			console.log("loi taikhoan");
			if (!taikhoans) return null;
			return res.json({optionNum: taikhoans});
		});
	}
}