// ----------------------------
// Question Dependencies
//-----------------------------

var _       = require('underscore')
var BusStop = require('./bus_stop')

// ----------------------------
// Question Variables
//-----------------------------

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
 * Parses all words within a questio body and removes
 * all non-semantically meaningful words
 */

Question.prototype.keywords = function () {
  var keywords = _(this.words())
    .reject(function (word) {
      return ANTI_KEYWORDS.indexOf(word) != -1
    })
    .join(" ")

  return keywords
}

/**
 * Returns an array of all words located within
 * a question body
 */

Question.prototype.words = function () {
  return this.body.toLowerCase().match(/(\w+)/g)
}

/**
 * Determines whether a question has enough
 * information to be accurately answered
 */

Question.prototype.valid = function () {
  return !!( this.location )
}

module.exports = Question
