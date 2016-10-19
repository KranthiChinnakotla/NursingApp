
var express = require('express');
console.log('home.js');
var register = express.Router();
var verify_token = require('../models/verify');
var mysql = require('../models/mysql');

register.post('/', function (req, res,next) {
	console.log('register');
    token = req.session.token;
    console.log(token);
    verify_token.verify(token,function(err, decoded) {
  
  if(!err){
  	console.log(decoded.user);
  	user = decoded.user;
      mysql.check_user(req.body.username,function(model){
          if(model ==  null){
            console.log("no data");
           console.log(req.body);
            mysql.add_user(req.body,function(user){
          console.log(user);
                  });
            res.render('pages/logout',{statusCode:200 , message : 'invalid session please login'});
          
        }else{
          
             res.render('pages/home',{error : 'user already exists'});
            
        }
      });
    
      
      
     // console.log(User);
      
      
  }else{
      console.log(err);
      user = null ;  
      req.session.token = null ;
      res.render('pages/logout',{statusCode:200 , message : 'invalid session please login'});
      
  }
});
});

module.exports = register;