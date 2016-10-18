var express = require('express');
var pr = express.Router();
var bodyParser = require('body-parser');
console.log('pr.js');
pr.use(bodyParser.urlencoded({ extended: true }));
pr.use(bodyParser.json());
var verify_token = require('../models/verify');

pr.post('/', function (req, res,next) {
	console.log('patient response');
   // console.log(req.body);
    //console.log(req.get('token'));
    
   var token =req.get('token');
    verify_token.verify(token,function(err, decoded) {
  
  if(!err){
  	console.log(decoded.user);
    var response  = req.body;
      response.username = decoded.user;
      console.log(response);
      
      
  }else{
      console.log(err);
      user = null ;  
      res.json({statusCode: 200, message : " invalid session", data: null});
      
  }
});
});

module.exports = pr;