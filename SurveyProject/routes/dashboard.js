
var express = require('express');
console.log('dashboard.js');
var dashboard = express.Router();
var verify_token = require('../models/verify');

var mysql = require('../models/mysql');

dashboard.get('/', function (req, res,next) {
	console.log('home page');
    token = req.session.token;
    //console.log(token);
    
       
    
    
    verify_token.verify(token,function(err, decoded) {
  
  if(!err){
  	console.log(decoded.user);
  	var user = decoded.user;
      
        mysql.allpatients(function(model) {
        if(model ==  null){
            console.log("no data");
            res.render('pages/admin_login',{statusCode : 200 , message : "invalid credentials" , error: "invalid credentials"});
            
        }else{
            console.log( JSON.stringify(model));
            var data = JSON.stringify(model);
           res.render('pages/dashboard',{statusCode : 200  , error: null, data : data});
             
        }
  });
      
      
  }else{
      console.log(err);
      user = null ;  
      req.session.token = null ;
      res.render('pages/logout',{statusCode:200 , message : 'invalid session please login'});
      
  }
});
});

module.exports = dashboard;