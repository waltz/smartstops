// ----------------------------
// Response Dependencies
//-----------------------------

var Twilio = require('twilio')

// ----------------------------
// Response
//-----------------------------

/**
 * Provides a wrapper around an Express.js response
 * object
 */

var Response = function ( response ) {
  this.response = response
}

// ----------------------------
// Response Instance Methods
//-----------------------------

/**
 * Sends an SMS
 * @param {String} [message] The message body sent
 */

Response.prototype.sms = function ( message ) {
  var client = new Twilio.TwimlResponse()
  client.sms( message )
  this.response.send( client.toString() ) // test
}

module.exports = Response
