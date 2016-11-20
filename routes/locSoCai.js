var express = require('express');
var router = express.Router();
var taikhoan = require('../models/taikhoan');
var nhacungcap = require('../models/nhacungcap'); 

router.get('/yeucau', function(req, res, next){
  taikhoan.find(function(err,resData){
    if (err) return err;
    console.log("loi taikhoan");
    if(!resData) return null;
    return res.json({ optionNum :resData});
  })

  nhacungcap.find(function(err, nccData){
  	if(err) return err;
  	console.log("loi nhacungcap");
  	if(!nccData) return null;
  	return res.json({ optionNCC: nccData});
  })
});

router.get('/locsocai', function(req, res, next){
  var maNhaCungCap = req.param("")
});

module.exports = router;
