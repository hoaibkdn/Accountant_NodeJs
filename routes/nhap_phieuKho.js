var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
const util = require('util');

router.post('/nhap_phieuKho', function(req, res, next) {
  console.log(req.body);
});

module.exports = router;