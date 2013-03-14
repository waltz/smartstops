var Twilio = require('twilio')

var Response = function ( response ) {
  this.response = response
}

Response.prototype = {

  sms: function ( message ) {
    var client = new Twilio.TwimlResponse()
    client.sms( message )
    this.response.send( client.toString() ) // test
  }

}

module.exports = Response
