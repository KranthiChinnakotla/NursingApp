
var jwt = require('jsonwebtoken');
var express = require('express');
console.log('login.js');
var login = express.Router();
var Patient = require('../models/mysql')

login.get('/', function (req, res,next) {
	console.log('sending json with jwt');
    var user = req.query.user;
    var password = req.query.password;
    Patient.login_user(user,password, function(model) {
        if(model ==  null){
            console.log("no data");
            res.json({statusCode: 200, message : "invalid cedentials", data: null});
        }else{
            console.log(model);
            var token = jwt.sign({ user: 'indra' }, 'test' ,  {expiresIn:'60000', jwtid: 'jwtid' });
            res.json({statusCode: 200, message : " valid credentials", data: token});
        }
  })
    
});

module.exports = login;