exports.geocodeStopId = function(stopId){
	var CartoDB = require('cartodb');

	var client = new CartoDB({user: process.env.CARTO_USER, api_key: process.env.CARTO_KEY});

	client.on('connect', function() {
	    console.log("connected");
	});

	// Data if automatically parsed
	client.on('data', function(results) {
	    return results.rows[0];
	});

	client.on('error', function(err) {
	    console.log("some error ocurred");
	});

	client.query("select latitude, longitude from {table} where stopid = {stopid}", {table: 'sf_bus_stops', stopid: stopId});
}

