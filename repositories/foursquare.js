// ----------------------------
// Foursquare Dependencies
//-----------------------------

var config = require( process.cwd() + '/config')
console.log(process.env.FOURSQUARE_CLIENT_ID)
var client = require('node-foursquare')(config.foursquare),
    _      = require('underscore')

// ----------------------------
// Foursquare Repository
//-----------------------------

var Foursquare = function ( question, response ) {

  this.question = question
  this.response = response

}

// ----------------------------
// Foursquare Class Methods
//-----------------------------


Foursquare.canRespondTo = function ( question ) {
  return true;
}

// ----------------------------
// Foursquare Instance Methods
//-----------------------------


Foursquare.prototype = {

  respond: function ( ) {
    client.Venues.search(
      this._latitude(),
      this._longitude(),
      this._near(),
      this._parameters(),
      this._acessToken(),
      _.bind(this._processResponse, this)
    )

  },

  // private

  _near: function () {
    return null
  },

  _accessToken: function () {
    return null
  },

  _latitude: function () {
    return this.question.location.latitude
  },

  _longitude: function () {
    return this.question.location.longitude
  },

  _parameters: function () {
    return {
      query: this.question.keywords()
    }
  },

  _processResponse: function ( req, res ) {
    var venues = _(res.venues).map(function (venue) {
      return new Venue(venue)
    })

    var venue = _(venues).first()

    if (venue) {
      this.response.sms(venue.name)
    } else {
      this.response.sms("No results. Please try again.")
    }
  }

}

// ----------------------------
// Foursquare Response Wrapper
//-----------------------------


var Venue = function ( venue ) {
  this.name = venue.name
}


module.exports = Foursquare
