
var express = require('express');
console.log('login.js');
var allpatients = express.Router();
var mysql = require('../models/mysql');

allpatients.get('/', function (req, res,next) {
	
    mysql.allpatients(function(model) {
        if(model ==  null){
            console.log("no data");
            res.json({statusCode: 200, message : "invalid cedentials", data: null});
        }else{
            console.log(model);
           // model = JSON.stringify(model);
            res.json({statusCode: 200, message : " valid credentials", data: model});
        }
  })
    
});

module.exports = allpatients;