var Nhacungcap = require('../models/nhacungcap');

module.exports = {
	getNhaCungCapJSON: function(req, res, next) {
		Nhacungcap.find(function(err, nhaCungCaps) {
			if(err) return err;
			if(!nhaCungCaps) return null;
			return res.json({optionNCC: nhaCungCaps});
		})
	}
}