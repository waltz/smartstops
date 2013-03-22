// ----------------------------
// Question Dependencies
//-----------------------------

var _       = require('underscore')
var BusStop = require('./bus_stop')

var ANTI_KEYWORDS = [ "where", "near", "around", "is", "the", "a" ]

// ----------------------------
// Question
//-----------------------------

/**
 * Provides a wrapper around an incoming text message
 */

var Question = function ( question ) {

  this.from = question.From
  this.body = question.Body

  var stop = BusStop.findByQuestion( this )

  if (stop) {
    this.location = stop.location
  }
}

// ----------------------------
// Question Instance Methods
//-----------------------------

/**
 * Parses a question body and returns a list
 * of semantically rich keywords
 */

Question.prototype.keywords = function () {
  var words = this.body.toLowerCase().match(/(\w+)/g)

  return _(words).reject(function (word) {
    return ANTI_KEYWORDS.indexOf(word) != -1
  }).join(" ")
}

/**
 * Determines whether a question has enough
 * information to be accurately answered
 */

Question.prototype.valid = function () {
  return !!( this.location )
}

module.exports = Question
