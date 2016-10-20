
var express = require('express');
var fs = require('fs');
//var csvjson = require('csvjson');
var Converter = require("csvtojson").Converter;
var path = require('path');
console.log('login.js');
var login = express.Router();
var mysql = require('../models/mysql');

login.get('/', function (req, res,next) {

    console.log('insert');
    var csvConverter=new Converter({});


    csvConverter.on("end_parsed",function(jsonObj){
        //console.log(jsonObj);
        mysql.insert_questions(jsonObj);
        res.send({statusCode:200,message:"data stored"});
    });

//read from file
    fs.createReadStream( path.join(__dirname, '../public/Homework1_Questions.csv')).pipe(csvConverter);
});

module.exports = login;