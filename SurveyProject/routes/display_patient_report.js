
var express = require('express');
console.log('dashboard.js');
var user_response = express.Router();
var verify_token = require('../models/verify');

var mysql = require('../models/mysql');

user_response.get('/', function (req, res,next) {
    console.log('home page');
    token = req.session.token;
    //console.log(token);

    var patient = req.query.id;
    verify_token.verify(token,function(err, decoded) {

        if(!err){
            console.log(decoded.user);
            var user = decoded.user;

            mysql.get_patient_report(patient,function(model) {
                if(model ==  null){
                    console.log("no data");
                    res.render('pages/admin_login',{statusCode : 200 , message : "invalid credentials" , error: "invalid credentials"});

                }else{
                    console.log( JSON.stringify(model));
                    var data = JSON.stringify(model);
                    res.render('pages/patientreport',{statusCode : 200  , error: null, data : data});

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

module.exports = user_response;