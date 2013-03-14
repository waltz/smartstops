config = {
  secrets: {
    clientId:     "2NJEJ3OGJI3SJQNUBSWCEFZ4YHBMBLFVE54F5MERHX2GP3FS",
    clientSecret: "TW0SZSEW3SAATL0GORXQYZSKV1PRXXXRWOTBEOTPOGLZCNEA",
    redirectUrl:  "http://google.com"
  }
}

var client = require('node-foursquare')(config)

var Venue = function ( venue ) {
  this.name = venue.name
}

var Foursquare = function () {

}

Foursquare.prototype = {

  answer: function ( question, stop ) {
    client.Venues.search( stop.latitude, stop.longitude, null, { query: question.body }, null, this._processResponse )
  },

  // private

  _processResponse: function ( req, res ) {
    var venues  = res.venues
    var fvenues = []

    for (i in res.venues) {
      fvenues.push( new Venue( venues[i] ) )
    }

    return fvenues;
  }

}

Foursquare.canRespondTo = function ( question ) {
  return true;
}

module.exports = Foursquare
