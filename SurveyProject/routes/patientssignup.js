
var express = require('express');
console.log('patientssignup.js');
var patientssignup = express.Router();
var verify_token = require('../models/verify');

patientssignup.get('/', function (req, res,next) {
	console.log('patientssignup');
    token = req.session.token;
    console.log(token);
    verify_token.verify(token,function(err, decoded) {
  
  if(!err){
  	console.log(decoded.user);
  	user = decoded.user;
      res.render('pages/patientssignup');
      
      
      
  }else{
      console.log(err);
      user = null ;  
      req.session.token = null ;
      res.render('pages/logout',{statusCode:200 , message : 'invalid session please login'});
      
  }
});
});

module.exports = patientssignup;