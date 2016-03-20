var express = require('express');
var bodyParser = require("body-parser");
var app     = express();


app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/humanitarian', function(req, res)
{
	res.sendFile( __dirname  + '/main.html');
});

app.get('/humanitarian/proposition', function(req, res)
{

	//Get parameters values
	var YourName = req.param("prop-name");
	var city = req.param("prop-city");
	var country = req.param("prop-country");
	var adress = req.param("prop-adress");
	var zipcode = req.param("prop-zipcode");
	var sleepingPlaces = req.param("prop-sleepingPlaces");

	//create item
	var item = {
	  "YourName" : YourName,
	  "city" : city,
	  "country" : country,
	  "adress" : adress,
	  "zipcode" : zipcode,
	  "sleepingPlaces" : sleepingPlaces
	}


	//add item to database


	//redirect user to the main page
	res.sendFile(__dirname + "/main.html");

});


app.listen('8082')
console.log('the server is started');
