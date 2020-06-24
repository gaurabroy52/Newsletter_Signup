//jshints esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req,res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;


  //Accroding to mailchimps server data preparing to submit
  //adding the user singup details to mailchimp server list
  var data ={
    members : [
      {
        email_address : email,
        merge_fields :{
          FNAME : firstName,
          LNAME : lastName
        },
        status : "subscribed"
      }
    ]
  };
  var jsonData = JSON.stringify(data);
  var options ={
    url : "https://us18.api.mailchimp.com/3.0/lists/22478320e9",
    method : "POST",
    headers :{
      //api key
      "Authorization" : "Gaurab1 a2532a35de381a3400e33422ba09a1e3-us18"
    },
   body : jsonData
  };
  request(options , function(error, response, body){
    if(error){
      res.sendFile(__dirname + "/failure.html");
    }else{
      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });


});
app.post("/failure" , function( req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("server is running at port number 3000");
});
// api key
//a2532a35de381a3400e33422ba09a1e3-us18

//list
//22478320e9
