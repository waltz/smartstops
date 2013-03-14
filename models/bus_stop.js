var Location = require('./location')
var data     = require('../data/bus_stops')

var STOP_ID_REGEX = /\d{3,}/

var BusStop = function ( id, attributes ) {

  this.id        = id
  this.location  = new Location( attributes )

}

BusStop.idFromString = function ( string ) {
  if (!string) string = ""
  return ( string.match( STOP_ID_REGEX )  || [] )[0]
}

BusStop.findByQuestion = function ( question ) {
  var id = BusStop.idFromString( question.body )

  if (attrs = data[id]) {
    return new BusStop(id, attrs)
  }
}

module.exports = BusStop
