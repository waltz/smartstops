var SmartStops = require('../../../smart_stops')

// Import the required Node modules.
var twilio = require('twilio')

// Read the Post data
exports.post = function( req, res ) {

  var question = new SmartStops.Models.Question( req.body )
  var stop     = SmartStops.Models.BusStop.findByQuestion(question)

  // Figure out if there is a bus stop in the question, short
  // circuit if not.
  if (stop) {
    var repository = new SmartStops.Repositories.Foursquare( )
    repository.answer( question, stop )
    console.log("Bus stop found")
  } else {
    console.log("Could not locate bus stop")
    var twiml = new twilio.TwimlResponse();
    twiml.sms("Sorry, we couldn't locate your bus stop!");
    res.send(twiml.toString());    
  }    
  
}
