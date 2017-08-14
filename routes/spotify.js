

var request = require('request-promise'); // "Request" library
var client_id = '413ad935a77746039180a507510de9f3'; // Your client id
var client_secret = 'b99b342ba55a4753971b7fdeb79ed57b'; 
var express = require('express');
var router = express.Router();// Your secret



// curl -X "POST" -H "Authorization: Basic 413ad935a77746039180a507510de9f3:b99b342ba55a4753971b7fdeb79ed57b" -d grant_type=client_credentials http://accounts.spotify.com/api/token
// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};




	
	function getAuthToken(){
		return new Promise((resolve,reject)=>{
		request.post(authOptions, function(err, response, body) {
		  if(err){
		  	reject(err)
		  }
		  if (response.statusCode === 200) {
		    var token = body.access_token;
		    console.log(token)
		    resolve(token)
  			}
		});
	})
}

router.get('/auth',(req,res)=>{
 	request.post(authOptions)
 		.then(function(body){
 			var token  = body.access_token;
 			res.json({token:token,msg:'Able to retrieve token'})
 		})
 		.catch(err=>{
 			res.json({err:'Unable to recieve token'})
 		})
})


module.exports = router;



