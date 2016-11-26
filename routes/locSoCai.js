var express = require('express');
var router = express.Router();
var taikhoan = require('../models/taikhoan');
var nhacungcap = require('../models/nhacungcap'); 
var chungtu = require('../models/chungtu');

router.get('/yeucauTK', function(req, res, next){
  taikhoan.find(function(err,resData){
    if (err) return err;
    console.log("loi taikhoan");
    if(!resData) return null;
    return res.json({ optionNum :resData});
  })
});

router.get('/yeucauNCC', function(req, res, next){
	nhacungcap.find(function(err, nccData){
  	if(err) return err;
  	if(!nccData) return null;
  	return res.json({ optionNCC: nccData});
  })
});
router.get('/baocao', function(req, res, next){
  var maNhaCungCap = req.param("nhaCungCap");
  var maTaiKhoan = req.param("idTaiKhoan");

  chungtu.find({}, function(err, baocao){
  
  	console.log("maNhaCungCap "+maNhaCungCap);
  	console.log("maTaiKhoan "+maTaiKhoan);
  	// var bcjs = JSON.stringify(baocao);
  	console.log("baocao "+baocao);
  	if(err) res.send(err);
  	else{
  		res.render('pages/socaitaikhoan', 
  		{ 
			user: req.user,
		    baocao: req.baocao
  		});
  	}
  	
  });			
});

module.exports = router;