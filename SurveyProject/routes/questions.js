
var express = require('express');
console.log('questions.js');
var login = express.Router();
var mysql = require('../models/mysql');

login.get('/', function (req, res,next) {
console.log('questions');
 mysql.Questions( function(model) {
    console.log(model);
    res.json({statusCode: 200, message : " Questions ", data: model});
});
});

module.exports = login;