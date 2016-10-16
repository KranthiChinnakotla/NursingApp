var jwt = require('jsonwebtoken');
var express = require('express');
var bodyParse = require('body-parser');
var msql = require('mysql');
var app = express();

app.use(express.static('public'));
app.get('/admin_login', function (req, res) {
    var user = req.query.user;
    var password = req.query.password;
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
              }else {
                var query = 'select * from Admin_details where user = "'+user+'" and password = "'+password+'"';
                 console.log(query);
               connection.query(query,function(err,rows){
                if(err) throw err;
                   if(rows.length == 0){
                       res.json({status:200,messge:"invalid credentils"});
                   }else{ 
                    var token = jwt.sign({ user: 'indra' }, 'test' ,  {expiresIn:'60000', jwtid: 'jwtid' });
                    res.json( token );
                   }
               });
              }
         });
         
     }
    handleDisconnect();
    
});

app.get('/verify', function (req, res) {
	console.log('got json with jwt');

var token = req.query.token;
var decoded = jwt.verify(token, 'test' ,  { jwtid: 'jwtid' } ,function(err, decoded) {
  // if jwt id mismatch, err == invalid jwt id
  
  if(!err){
  	console.log(decoded.user);
    res.json( {status : 200 , message : "verified"} );
  }else{
      console.log(err);
      res.json( {status : 200 , message : "invalid session"} );
  }
});


});
var msg = 'Welcome to our API';
app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json());

var port = process.env.PORT || 8081;

//require('./routes/routes.js')(app); 
app.listen(port);
console.log('Magic happens on port' + port);
