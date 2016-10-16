
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