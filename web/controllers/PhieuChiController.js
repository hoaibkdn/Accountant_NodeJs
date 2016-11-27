module.exports = {
	viewFormPhieuChi: function(req, res, next) {
		res.render('pages/phieuchitienmat', { 
		    user: req.user
		});
	}
}