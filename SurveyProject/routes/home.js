
var express = require('express');
console.log('home.js');
var home = express.Router();
var verify_token = require('../models/verify');

home.get('/', function (req, res,next) {
	console.log('home page');
    token = req.session.token;
    console.log(token);
    verify_token.verify(token,function(err, decoded) {
  
  if(!err){
  	console.log(decoded.user);
  	user = decoded.user;
      res.render('pages/home');
      
      
      
  }else{
      console.log(err);
      user = null ;  
      req.session.token = null ;
      res.render('pages/logout',{statusCode:200 , message : 'invalid session please login'});
      
  }
});
});

module.exports = home;