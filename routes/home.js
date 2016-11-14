var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
/* GET list departments page. */

// var context = {
//   author: {firstName: "Alan", lastName: "Johnson"},
//   body: "I Love Handlebars",
//   comments: [{
//     author: {firstName: "Yehuda", lastName: "Katz"},
//     body: "Me too!"
//   }]
// };
// Handlebars.registerPartial('userMessage',
//     '<{{tagName}}>By {{author.firstName}}<script>alert({{.author.firstName}})</script> </{{tagName}}>'
//     + '<div class="body">{{body}}</div>');

router.get('/', function (req, res) {  
  res.render('home',{
      
  })
});
module.exports = router;