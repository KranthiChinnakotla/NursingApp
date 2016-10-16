
 
//var exports = module.exports = {};
var mysql = require('mysql');
var knex = require('knex')({
  client: 'mysql',
  connection: {
      host : 'mydbase.cwgnanpueibv.us-east-1.rds.amazonaws.com',
      user : 'indra',
      password : 'qqqqqqqq',
      port : '3306',
      database: "SurveyProject"
  }
});
// console.log("knex");
var bookshelf = require('bookshelf')(knex);
console.log("bookshelf");


var Patient = bookshelf.Model.extend({
tableName: 'Patients'
});

var Admin = bookshelf.Model.extend({
tableName: 'Admin_details'
});

module.exports.login_user = function(user,pass,callback) {

new Patient({username: user , passw: pass })
.fetch()
.then(callback);
	
}

module.exports.login_admin = function(user,pass,callback) {

new Patient({user: user , passw: pass })
.fetch()
.then(callback);
	
}