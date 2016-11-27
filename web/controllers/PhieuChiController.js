var ChungTu = require('../models/chungtu');

module.exports = {
	viewFormPhieuChi: function(req, res, next) {
		var _id = req.param("id");
		ChungTu.findOne({
			_id : _id
		}, function(err, chungtu) {
			console.log("chungtu "+chungtu);
			if(err) next(err);
			else {
				res.render('pages/phieuchitienmat', {
				    user: req.user,
				    chungtu: chungtu
				});
			}
		})
		
	}
}