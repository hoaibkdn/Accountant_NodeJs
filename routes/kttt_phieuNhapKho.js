var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ChungTu = require('../models/chungtu');
var loggedIn = require('../helpers/loggedIn');

/* GET home page. */
router.get('/', loggedIn, function(req, res, next) {
  res.render('pages/kttt_phieuNhapKho', { 
    user: req.user,
  });
});

router.post('/', loggedIn, function(req, res, next){
  var chungtu = new ChungTu();
  chungtu.loaiChungTu = "Nhap Kho";
  chungtu.soChungTu = req.body.soChungTu;
  chungtu.dienGiai = req.body.dienGiai;
  chungtu.maSoThue = req.body.maSoThue;
  chungtu.hoaDon.kyHieuHD = req.body.kyHieuHD;
  chungtu.hoaDon.mauSo = req.body.mauSo;
  chungtu.hoaDon.ngayHD = req.body.ngayHD;
  chungtu.hoaDon.soHD = req.body.soHD;
  chungtu.save(function(err){
    if(err) next(err);
    else{
      res.redirect('/');
    }
  })
})

module.exports = router;
