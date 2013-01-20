function foursquare(fullMessage){
	var phoneNumber = fullMessage.phoneNumber;
	var latitude = fullMessage.latitude.toString();
	var longitude = fullMessage.longitude.toString();
	var message = fullMessage.message;
	var weatherKey = '4e11214676001957120909';
	var forecastDays = '5'

	console.log(phoneNumber);
	console.log(latitude);
	console.log(longitude);
	console.log(message);

	var limit = '1'
	var radius = '1000'
	var oauth_key = process.env.FOURSQUARE_OAUTH;
	var query = 'https://api.foursquare.com/v2/venues/search?ll='+latitude+','+longitude+'&limit='+limit+'&radius='+radius+'&query='+message+'&oauth_token='+oauth_key;
	
	var request = require('request');
	request(query, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var jsonResponse = JSON.parse(body);
	    var name = jsonResponse.response.venues[0].name;
	    var address = jsonResponse.response.venues[0].location.address;
	    var crossStreet = jsonResponse.response.venues[0].location.crossStreet;
	    var moduleResponse = name + ' at ' + address + ' ' + crossStreet;
	    console.log(moduleResponse);
	  }
	})
}

// ToDo: Parse the question for better precision.
//       Rank the responses somehow.


// Below is for testing

var fullMessage = {phoneNumber: '4153074175',
				   latitude: 37.775549,
				   longitude: -122.41378,
				   message: 'Whats the best coffee near bus stop 5545?'};

foursquare(fullMessage);