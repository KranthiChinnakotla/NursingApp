var bcrypt = require('bcrypt');
var saltRounds = 5;
var jwt = require('jsonwebtoken');
var express = require('express');
console.log('login.js');
var login = express.Router();
var mysql = require('../models/mysql');

login.get('/', function (req, res,next) {
	console.log('sending json with jwt');
    var user = req.query.user;
    var password = req.query.password;
    mysql.check_user(user,function(model) {
        if(model ==  null){
            console.log("no data");
            res.json({statusCode: 200, message : "invalid cedentials", data: null});
        }else{
            console.log(model);
            var hashpass = model.get('passw');
            console.log(hashpass);
           if( bcrypt.compareSync(password, hashpass)){
            var token = jwt.sign({ user: user }, 'test' ,  {expiresIn:'1800000', jwtid: 'jwtid' });
            res.json({statusCode: 200, message : " valid credentials", data: token});
            }else{
                res.json({statusCode: 200, message : "incorrect password", data: null});
            }
        }
  })
    
});

module.exports = login;