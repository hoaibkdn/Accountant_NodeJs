var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { 
    session: req.session
  });
});

module.exports = router;
