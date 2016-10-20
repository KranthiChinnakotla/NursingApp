
var express = require('express');
console.log('checkin.js');
var path = require('path');
var checkin = express.Router();
var jwt = require('jsonwebtoken');
var verify_token = require('../models/verify');
var mysql = require('../models/mysql');
var apn = require('apn');

fs = require('fs')



checkin.get('/', function (req, res,next) {


    var options = {
        cert: fs.readFileSync(path.join(__dirname, '../public/cert.pem')),
        key: fs.readFileSync(path.join(__dirname, '../public/key.pem')),
        production: false,
    };

    var deviceToken = "00f32665954abf0d9fc5ab67e5647fbad020e943c861fd1c36119049db2b877f";
        var apnProvider = new apn.Provider(options);

        token = req.session.token;
    var username  = req.query.id;

    verify_token.verify(token,function(err, decoded) {

        if(!err){
            console.log(decoded.user);
            var user = decoded.user;
            var token = jwt.sign({ user: username }, 'test' ,  {expiresIn:'1800000', jwtid: 'jwtid' });


            var note = new apn.Notification();

            note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
            note.badge = 3;
            note.sound = "ping.aiff";
            note.alert = "\uDCE7 Please start the survey "+username;
            note.payload = {'messageFrom': 'admin' , 'token' : token};
            note.topic = "edu.uncc.Group3AdvMobile";
            apnProvider.send(note, deviceToken).then( (result) => {
                // see documentation for an explanation of result
                console.log(result);
            });

            res.redirect('/dashboard');

        }else{
            console.log(err);
            user = null ;
            req.session.token = null ;
            res.render('pages/logout',{statusCode:200 , message : 'invalid session please login'});

        }
    });
});



module.exports = checkin;