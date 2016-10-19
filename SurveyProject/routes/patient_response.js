var express = require('express');
var pr = express.Router();
var bodyParser = require('body-parser');
console.log('pr.js');
pr.use(bodyParser.urlencoded({ extended: true }));
pr.use(bodyParser.json());
var verify_token = require('../models/verify');
var mysql = require('../models/mysql');

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


      var Medication  = req.body.r1+req.body.r2+req.body.r3;
      var Diet = req.body.r4+req.body.r5+req.body.r6+req.body.r7+req.body.r8+req.body.r9+req.body.r10+req.body.r11+req.body.r12+req.body.r13+req.body.r14;
      var PhysicalActivity = req.body.r15+req.body.r16;
      var Smoking = req.body.r19+req.body.r20;
      var WeightManagement = req.body.r21+req.body.r22+req.body.r23+req.body.r24+req.body.r25+req.body.r26+req.body.r27+req.body.r28+req.body.r29+req.body.r30;
      var Alcohol  = req.body.r32 * req.body.r33;
      var Medication_result,Diet_result,PhysicalActivity_result,Smoking_result,WeightManagement_result,Alcohol_result,gender;

      console.log(Medication+"j",Alcohol);
      mysql.check_user(response.username,function(model) {
          console.log(model.get('gender'));
          gender = model.get('gender');
          if(Medication == 21 && req.body.medication_check == 0 ){
              Medication_result = "adherent" ;
          }else if( req.body.medication_check == 1 ){
              Medication_result = "N/A" ;
          }else if(req.body.medication_check == 0 && Medication < 21){
              Medication_result = "not adherent";
          }

          if( Diet < 31){
              Diet_result = "low dite quality";
          }else if ( Diet >30 && Diet<52){
              Diet_result = "Medium quality dite";
          }else if ( Diet>51){
              Diet_result = "adherent";
          }
          if(req.body.nuts_check == 1){
              Diet_result = Diet_result + "(allergic to nuts)";
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
          if( Alcohol > 14 && gender === 'Male'){
              Alcohol_result = "not adherent";
          }else if(Alcohol <= 14 && gender === 'Male'){
              Alcohol_result = "adherent ";
          }

          if( Alcohol > 7 && gender === 'Female'){
              Alcohol_result = "not adherent";
          }else if(Alcohol <= 7 && gender === 'Female'){
              Alcohol_result = "adherent ";
          }

          var report_data = { Medication_result: Medication_result,
              Dite_result:Diet_result,
              PhysicalActivity_result:PhysicalActivity_result,
              Smoking_result:Smoking_result,
              WeightManagement_result:WeightManagement_result,
              Alcohol_result:Alcohol_result,
              Medication: Medication,
              Diet: Diet,
              PhysicalActivity:PhysicalActivity,
              Smoking:Smoking,
              Alcohol:Alcohol,
              WeightManagement:WeightManagement
          };

          mysql.put_patient_response(response,function (model) {

              console.log(model);
              console.log(model.get('id'));
              console.log(model.get('username'));
              report_data.rID = model.get('id');
              report_data.username = model.get('username');
              console.log(report_data);
              mysql.put_patient_report(report_data,function (model) {
                  console.log(model);
              });

          });

      });

      res.send({statusCode:200, message : "response stored successfully"})



  }else{
      console.log(err);
      user = null ;  
      res.json({statusCode: 200, message : " invalid session", data: null});
      
  }
});
});

module.exports = pr;