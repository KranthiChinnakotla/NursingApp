module.exports = require('mysql')

var express = require('express');
var app = express();
var bodyParse = require('body-parser');
var msql = require('mysql');
var jwt = require('jsonwebtoken');
var pug = require('pug');


app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());
app.set('views', './views');
app.set('view engine', 'pug');

var token = jwt.sign({ user: 'indra' }, 'test' ,  {expiresIn:'60000', jwtid: 'jwtid' });


module.exports = function(app) {  
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    }); 


    app.get('/index.html', function (req, res) {
       res.sendFile(  __dirname + "/" + "index.html" );
    });
    app.get('/get_request', function (req, res) {
      var request  = req.query.request;
      console.log(request+"");
      if(request == "new_user"){
      res.sendFile(  __dirname + "/" + "signup.html" );
    }
    });

    app.post('/register', function (req, res) {
       function handleDisconnect() {
              var connection = msql.createConnection({
                   host : 'mydbase.cwgnanpueibv.us-east-1.rds.amazonaws.com',
                    user : 'indra',
                    password : 'qqqqqqqq',
                    port : '3306',
                   database: "SurveyProject"
              });

               connection.connect(function(err){
                  if(err){
                      console.log('Error while connecting to database:',err);
                      handleDisconnect();
                      setTimeout(handleDisconnect,2000);
                  }else {

                    var query = 'select * from Patients where username = "'+req.body.username+'"';
                     console.log(query);
                   connection.query(query,function(err,rows){
                    if(err) throw err;
                 if(rows.length == 0){
                  query = 'insert into SurveyProject.Patients(username,name,gender,age,passw) values("'+req.body.username+'","'+req.body.name+'","'+req.body.gender+'","'+req.body.age+'","'+req.body.pwd+'")';
                     console.log(query);
                   connection.query(query,function(err){
                    if(err) throw err;
                 res.sendFile(  __dirname + "/" + "index.html" );
              });
    }
    else{
      console.log("user exists");
      //res.end("User Exists");
     res.render('signup', { data : 'Tobi' });
    }

    });
          }
     });
           }
          handleDisconnect();
          
       });


        app.use(express.static('public'));
          app.get('/index.html', function (req, res) {
            console.log('sending json with jwt');
             res.json( token );
          });

          app.get('/verify.html', function (req, res) {
            console.log('got json with jwt');

          var token = req.query.token;
          var decoded = jwt.verify(token, 'test' ,  { jwtid: 'jwtid' } ,function(err, decoded) {
            // if jwt id mismatch, err == invalid jwt id
            console.log(err);
            if(!err){
              console.log(decoded.user);
            }
          });

             res.send( "verified" );
        });


    app.post('/patientssurvey',function(req,res){


        function handleDisconnect() {
          var connection = msql.createConnection({
               host : 'mydbase.cwgnanpueibv.us-east-1.rds.amazonaws.com',
                user : 'indra',
                password : 'qqqqqqqq',
                port : '3306',
               database: "SurveyProject"
          });
          var Medication_check = req.body.check;
          var Medication  = req.body.r1+req.body.r2+req.body.r3;
          var Diet = req.body.r4+req.body.r5+req.body.r6+req.body.r7+req.body.r8+req.body.r9+req.body.r10+req.body.r11+req.body.r12+req.body.r13+req.body.r14;
          var PhysicalActivity = req.body.r15+req.body.r16;
          var Smoking = req.body.r19+req.body.r20;
          var WeightManagement = req.body.r21+req.body.r22+req.body.r23+req.body.r24+req.body.r25+req.body.r26+req.body.r27+req.body.r28+req.body.r29+req.body.r30;
          var Alcohol  = req.body.r32 * req.body.r33;
          var Medication_result,Diet_result,PhysicalActivity_result,Smoking_result,WeightManagement_result,Alcohol_result,gender;
          
           connection.connect(function(err){
              if(err){
                  console.log('Error while connecting to database:',err);
                  setTimeout(handleDisconnect,2000);
              }else {

                var query = 'select gender from Patients where username = "'+req.body.username+'"';
                 console.log(query);
               connection.query(query,function(err,rows){
                if(err) throw err;
                gender = rows[0]['gender'];
                console.log("gender"+ rows[0]['gender']);
                 if(Medication = 21 & Medication_check == 0 ){
              Medication_result = "adherent" ;
          }else if( Medication_check == 1 ){
             Medication_result = "N/A" ;
          }else if(Medication_check == 0 & Medication <21){
            Medication_result = "not adherent";
          }

          if( Diet < 31){
            Diet_result = "low dite quality";
          }else if ( Diet >30 & Diet<52){
            Diet_result = "Medium quality dite";
          }else if ( Diet>51){
            Diet_result = "adherent";
          }
      
           if( PhysicalActivity < 8){
            PhysicalActivity_result = "not adherent";
          }else {
            PhysicalActivity_result = "adherent";
          }
           if( Smoking == 0){
            Smoking_result = " adherent";
          }else {
            Smoking_result = "not adherent";
          }

          if( WeightManagement >= 40){
            WeightManagement_result = " adherent to good WeightManagement practice";
          }else {
            WeightManagement_result = "not adherent to good WeightManagement practice";
          }
             if( Alcohol > 14 & gender == 'Male'){
            Alcohol_result = " adherent";
          }else if(Alcohol <= 14 & gender == 'Male'){
            Alcohol_result = "not adherent ";
          }

           if( Alcohol > 7 & gender == 'Female'){
            Alcohol_result = " adherent";
          }else if(Alcohol <= 7 & gender == 'Female'){
            Alcohol_result = "not adherent ";
          }


          

         
                var q = 'INSERT into patient_response (username,r1,r2,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,r13,r14,r15,r16,r17,r18,r19,r20,r21,r22,r23,r24,r25,r26,r27,r28,r29,r30,r31,r32,r33,Medication,Diet,PhysicalActivity,Smoking,WeightManagement,Alcohol,Medication_check,Medication_result,Dite_result,PhysicalActivity_result,Smoking_result,WeightManagement_result,Alcohol_result) values ("'+req.body.username+'","'+req.body.r1+'","'+req.body.r2+
                 '","'+req.body.r3+'","'+req.body.r4+'","'+req.body.r5+'","'+req.body.r6+'","'+req.body.r7+'","'+req.body.r8+'","'+req.body.r9+'","'+req.body.r10+'","'+req.body.r11+'","'+req.body.r12+'","'+req.body.r13+'","'+req.body.r14+'","'+req.body.r15+'","'+req.body.r16+'","'+req.body.r17+'","'+req.body.r18+
                 '","'+req.body.r19+'","'+req.body.r20+'","'+req.body.r21+'","'+req.body.r22+'","'+req.body.r23+'","'+req.body.r24+'","'+req.body.r25+'","'+req.body.r26+'","'+req.body.r27+'","'+req.body.r28+'","'+req.body.r29+'","'+req.body.r30+'","'+req.body.r31+'","'+req.body.r32+'","'+req.body.r33+'","'+Medication+'","'+Diet+'","'+PhysicalActivity+'","'+Smoking+'","'+WeightManagement+'","'+Alcohol+'","'+Medication_check+'","'+Medication_result+'","'+Diet_result+'","'+PhysicalActivity_result+'","'+Smoking_result+'","'+WeightManagement_result+'","'+Alcohol_result+'")';
                 console.log(q);
               connection.query(q,function(err,rows){
                if(err) throw err;
              });
             
               res.json("Data has been inserted");
              });
         
              
              }
          });
          connection.on('error', function(err) {
              console.log('db error', err);
              if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
                   handleDisconnect();
              } else {                                      
                throw err;                                  
              }
            });
          }
          handleDisconnect();

     });  
  

  app.get('/allpatients',function(req,res){   
    function handleDisconnect() {
          var connection = msql.createConnection({
                host : 'mydbase.cwgnanpueibv.us-east-1.rds.amazonaws.com',
                user : 'indra',
                password : 'qqqqqqqq',
                port : '3306',
                database: "SurveyProject"
          });
          connection.connect(function(err){
              if(err){
                  console.log('Error while connecting to database:',err);
                  setTimeout(handleDisconnect,2000);
              }else{
                var q = 'SELECT * FROM Patients';
                console.log(q);
              connection.query(q,function(err,rows){
                if(err) throw err;

                console.log('Data received from Db sorted:\n');
                //console.log(rows);
                res.json(rows);
                });
              }
          });
          connection.on('error', function(err) {
              console.log('db error', err);
              if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
                   handleDisconnect();
              } else {                                      
                throw err;                                  
              }
            });
          }
          handleDisconnect();
     });

     app.get('*', function(req, res){
        res.send('Sorry, this is an invalid URL.');
    });          
}