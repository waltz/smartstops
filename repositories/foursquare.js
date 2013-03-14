config = {
  secrets: {
    clientId:     "2NJEJ3OGJI3SJQNUBSWCEFZ4YHBMBLFVE54F5MERHX2GP3FS",
    clientSecret: "TW0SZSEW3SAATL0GORXQYZSKV1PRXXXRWOTBEOTPOGLZCNEA",
    redirectUrl:  "http://google.com"
  }
}

var client = require('node-foursquare')(config)

var Foursquare = function () {
}

Foursquare.prototype = {

  answer: function ( question, stop ) {
    callback = function ( req, res ) {
      console.log( res )
    }

    client.Venues.search( stop.latitude, stop.longitude, null, { query: "burritos" }, null, callback )
  }

}

Foursquare.canRespondTo = function ( question ) {
  return true;
}

module.exports = Foursquare
