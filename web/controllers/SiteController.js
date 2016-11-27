module.exports = {
	/* GET home page. */
	homepage: function(req, res, next) {
		res.render('pages/index', {user: req.user});
	}
}