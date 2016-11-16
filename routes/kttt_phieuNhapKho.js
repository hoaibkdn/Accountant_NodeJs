var express = require('express');
var router = express.Router();
var loggedIn = require('../helpers/loggedIn');

/* GET home page. */
router.get('/', loggedIn, function(req, res, next) {
  res.render('pages/kttt_phieuNhapKho', { 
    user: req.user,
  });
});

module.exports = router;