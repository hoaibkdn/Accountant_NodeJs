var express = require('express');
var router = express.Router();
var taikhoan = require('../models/taikhoan');

router.get('/hoaitruong', function(req, res, next){
  taikhoan.find(function(err,resData){
    if (err) return err;
    if(!resData) return null;
    return res.json({ optionNum :resData});
  })
});

module.exports = router;
