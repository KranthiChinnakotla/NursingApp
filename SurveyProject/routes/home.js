
var express = require('express');
console.log('home.js');
var home = express.Router();

home.get('/', function (req, res,next) {
	console.log('home page');
    res.render('pages/home');
    console.log(req.session.id);
});

module.exports = home;