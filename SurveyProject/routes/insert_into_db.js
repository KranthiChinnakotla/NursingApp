
var express = require('express');
var Converter = require("csvjson").Converter;
console.log('login.js');
var login = express.Router();
var mysql = require('../models/mysql');

login.get('/', function (req, res,next) {

    console.log('insert');

    var converter = new Converter({});
    converter.fromFile("../public/Homework1_Questions.scv",function(err,result){
    console.log(result);
    });

    
});

module.exports = login;