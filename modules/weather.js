function weather(fullMessage){
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

	var request = require('request');
	request('http://free.worldweatheronline.com/feed/weather.ashx?q='+latitude+','+longitude+'&format=json&num_of_days='+forecastDays+'&key='+weatherKey, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var jsonResponse = JSON.parse(body);
	    var currentTemp = jsonResponse.data.current_condition[0].temp_F + 'F';
	    var currentDesc = jsonResponse.data.current_condition[0].weatherDesc[0].value;
	    var moduleResponse = currentTemp + ' and ' + currentDesc;
	    console.log(moduleResponse);
	  }
	})
}

// Below is for testing

var fullMessage = {phoneNumber: '4153074175',
				   latitude: 37.775549,
				   longitude: -122.41378,
				   message: 'Whats the weather near blahblahblah?'};

weather(fullMessage);