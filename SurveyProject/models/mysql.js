
 
//var exports = module.exports = {};
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var saltRounds = 5;
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
// patient_response: function() {
//     return this.hasMany(Patient_response);
//   },patient_report: function() {
//         return this.hasMany(Patient_report);
//     }

});

var Patient_response = bookshelf.Model.extend({
   tableName : 'patient_response',
     patient: function() {
    return this.belongsTo(Patient);
<<<<<<< HEAD
    }
    
=======
     }
});

var Patient_report = bookshelf.Model.extend({
    tableName : 'patient_report',
    patient: function() {
        return this.belongsTo(Patient);
    }
>>>>>>> bf1f0fd8621bb53331048c82be32acd968ef9f05
});

var Admin = bookshelf.Model.extend({
tableName: 'Admin_details'
});


var Questions = bookshelf.Model.extend({
tableName: 'Questions'
});

module.exports.Questions = function(callback) {
new Questions()
.fetchAll()
.then(callback);
}

module.exports.login_admin = function(user,pass,callback) {
//var pass = bcrypt.hashSync(pass, saltRounds);
new Admin({user: user , password: pass })
.fetch()
.then(callback);
	
}

module.exports.add_user = function(user,callback) {
user.passw = bcrypt.hashSync(user.passw, saltRounds);
     console.log(user.username+' and '+user.passw);
    
new Patient(user).save()
.then(callback);
	
}

module.exports.check_user = function(user,callback) {
new Patient({username: user })
.fetch()
.then(callback);
}

module.exports.put_patient_response = function(data,callback) {
    //console.log(data);
    new Patient_response().save(data)
        .then(callback);
}

module.exports.get_patient_response = function(user,callback) {
    new Patient_response({username: user })
        .fetch()
        .then(callback);
}

module.exports.put_patient_report = function(data,callback) {
    //console.log(data);
    new Patient_report().save(data)
        .then(callback);
}

module.exports.get_patient_report = function(user,callback) {
    new Patient_report({username: user })
        .fetch()
        .then(callback);
}


