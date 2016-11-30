var express = require('express');
var router = express.Router();

var passport = require('passport');

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/logout', function(req,res){
	console.log("logout");
	req.session.destroy()
	req.logout()
	res.redirect('/')
});
module.exports = router;