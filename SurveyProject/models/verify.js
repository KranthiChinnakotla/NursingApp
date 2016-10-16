
var jwt = require('jsonwebtoken');
var user ;

module.exports.verify_user = function(token) {

	console.log('got json with jwt');

var decoded = jwt.verify(token, 'test' ,  { jwtid: 'jwtid' } ,function(err, decoded) {
  // if jwt id mismatch, err == invalid jwt id
  
  if(!err){
  	console.log(decoded.user);
  	user = decoded.user
    //res.json( {status : 200 , message : "verified"} );
  }else{
      console.log(err);
      //res.json( {status : 200 , message : "invalid session"} );
      user = null ;
  }
});

  