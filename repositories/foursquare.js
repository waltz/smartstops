// Foursquare configuration and account info.
config = {
  secrets: {
    clientId:     process.env.FOURSQUARE_CLIENT_ID,
    clientSecret: process.env.FOURSQUARE_CLIENT_SECRET,
    redirectUrl:  process.env.FOURSQUARE_REDIRECT_URL
  }
}

var client = require('node-foursquare')(config),
    _      = require('underscore')

var Foursquare = function ( question, response ) {

  this.question = question
  this.response = response

}

var Venue = function ( venue ) {
  this.name = venue.name
}

Foursquare.prototype = {

  respond: function ( ) {
    var callback = _.bind(this._processResponse, this)

    client.Venues.search(
      this.latitude(),
      this.longitude(),
      null,
      this.parameters(),
      null,
      callback
    )

  },

  latitude: function () {
    return this.question.location.latitude
  },

  longitude: function () {
    return this.question.location.longitude
  },

  parameters: function () {
    return {
      query: this.question.keywords()
    }
  },

  // private

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

Foursquare.canRespondTo = function ( question ) {
  return true;
}

module.exports = Foursquare
