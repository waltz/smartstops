// ----------------------------
// Foursquare Dependencies
//-----------------------------

var config = require( process.cwd() + '/config')
var client = require('node-foursquare')(config.foursquare),
    _      = require('underscore')

// ----------------------------
// Foursquare Variables
//-----------------------------

var KEYWORDS = [ "where", "near" ]

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

/**
 * Determines the likelihood with which the
 * Foursquare repository can answer a given
 * question
 * @parameter {Question} [question] the question one is
 * attempting to answer
 */

Foursquare.answerability = function ( question ) {
  var words = question.words()
  var match = 0

  _(KEYWORDS).each(function (keyword) {
    if (words.indexOf(keyword) == 0) match = 1
  })

  return match;
}

// ----------------------------
// Foursquare Instance Methods
//-----------------------------

/**
 * Responds to questions regarding venue near a
 * specific location
 */

Foursquare.prototype.respond = function ( ) {
  client.Venues.search(
    this._latitude(),
    this._longitude(),
    this._near(),
    this._parameters(),
    this._accessToken(),
    _.bind(this._processResponse, this)
  )
}

/**
 * TODO: See node-foursquare documentation
 */

Foursquare.prototype._near = function ( ) {
  return null
}

/**
 * Returns Foursquare user access token
 */

Foursquare.prototype._accessToken = function ( ) {
  return null
}

/**
 * Returns question location object
 */

Foursquare.prototype._location = function ( ) {
  return this.question.location
}

/**
 * Returns question asker's latitude
 */

Foursquare.prototype._latitude = function ( ) {
  var location = this._location()
  return location.latitude
}

/**
 * Returns question asker's longitude
 */

Foursquare.prototype._longitude = function ( ) {
  var location = this._location()
  return location.longitude
}

/**
 * Returns search parameters
 */

Foursquare.prototype._parameters = function ( ) {
  var parameters = {
    query: this.question.keywords()
  }
  return parameters
}

/**
 * Processes Foursquare.search response
 */

Foursquare.prototype._processResponse = function ( req, res ) {
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

// ----------------------------
// Foursquare Response Wrapper
//-----------------------------

/**
 * Wraps the Foursquare response in a function
 */

var Venue = function ( venue ) {
  this.name = venue.name
}


module.exports = Foursquare
