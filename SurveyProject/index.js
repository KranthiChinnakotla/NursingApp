module.exports = require('./node_modules/express/lib/express')
module.exports = require('./node_modules/body-parser')
module.exports = require('./node_modules/mysql')


var express = require('express');
var app = express();
var bodyParse = require('body-parser');
var msql = require('mysql');

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
var msg = 'Welcome to our API';
app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json());

var port = process.env.PORT || 8080;

require('./routes/routes.js')(app); 
app.listen(port);
console.log('Magic happens on port' + port);
