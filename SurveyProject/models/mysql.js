
 
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
tableName: 'Patients',
patient_response: function() {
    return this.hasMany(Patient_response);
  }
});

var Patinet_response = bookshelf.Model.extend({
   tableName : 'patinet_response',
     patient: function() {
    return this.belongsTo(Patient);
     }
});

var Admin = bookshelf.Model.extend({
tableName: 'Admin_details'
});


var Questions = bookshelf.Model.extend({
tableName: 'Questions'
});

module.exports.Questions = function(callback) {
new Patient()
.fetchAll()
.then(callback);
}
module.exports.allpatients = function(callback) {

new Patient()
.fetchAll()
.then(callback);
	
}

module.exports.login_user = function(user,pass,callback) {

new Patient({username: user , passw: pass })
.fetch()
.then(callback);
	
}

module.exports.login_admin = function(user,pass,callback) {

new Admin({user: user , password: pass })
.fetch()
.then(callback);
	
}