// ----------------------------
// BusStop Dependencies
//-----------------------------

var Location = require('./location')
var data     = require('../data/bus_stops')

var STOP_ID_REGEX = /\d{3,}/

// ----------------------------
// BusStop
//-----------------------------

/**
 * A function that enables one to query the bus stop
 * data store, and determine the location of an
 * individual bus stop
 */

var BusStop = function ( id, attributes ) {

  this.id        = id
  this.location  = new Location( attributes )

}

// ----------------------------
// BusStop Class Methods
//-----------------------------

/**
 * Parses a string to check for bus stop id
 * @param {String} [string] Any string
 */

BusStop.idFromString = function ( string ) {
  if (!string) string = ""
  return ( string.match( STOP_ID_REGEX )  || [] )[0]
}

/**
 * Returns an instance of BusStop if the question
 * body contains a valid bus stop id
 * @param {Question} [question] An instance of
 * Question
 */

BusStop.findByQuestion = function ( question ) {
  var id = BusStop.idFromString( question.body )

  if (attrs = data[id]) {
    return new BusStop(id, attrs)
  }
}

module.exports = BusStop
