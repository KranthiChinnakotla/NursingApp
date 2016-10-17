
var jwt = require('jsonwebtoken');
var express = require('express');
console.log('admin.js');
var login = express.Router();
var mysql = require('../models/mysql');

login.get('/', function (req, res,next) {
	
    console.log(req.sessionID);
    
    var user = req.query.user;
    var password = req.query.password;
    if(user == null || password == null){
        res.render('pages/admin_login',{statusCode : 200 , message : "" , error: null});
    }else{
    mysql.login_admin(user,password, function(model) {
        if(model ==  null){
            console.log("no data");
            res.render('pages/admin_login',{statusCode : 200 , message : "invalid credentials" , error: "invalid credentials"});
            //res.json({statusCode: 200, message : "invalid cedentials", data: null});
        }else{
            console.log(model);
            var token = jwt.sign({ user: user }, 'test' ,  {expiresIn:'60000', jwtid: 'jwtid' });
             res.render('pages/home',{statusCode : 200 , message : "valid credentials" , token : token});
            //res.json({statusCode: 200, message : " valid credentials", token: token});
        }
  })
    
    }
});

module.exports = login;