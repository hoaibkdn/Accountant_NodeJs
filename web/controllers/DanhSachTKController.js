module.exports = {

	viewDSTK: function(req, res, next) {
		res.render('pages/danhSachTaiKhoanKTT', {user: req.user});
	}
}