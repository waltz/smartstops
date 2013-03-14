// Remove me
config = {
  secrets: {
    clientId:     "2NJEJ3OGJI3SJQNUBSWCEFZ4YHBMBLFVE54F5MERHX2GP3FS",
    clientSecret: "TW0SZSEW3SAATL0GORXQYZSKV1PRXXXRWOTBEOTPOGLZCNEA",
    redirectUrl:  "http://google.com"
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

    this.response.sms(venue)
  }

}

Foursquare.canRespondTo = function ( question ) {
  return true;
}

module.exports = Foursquare
