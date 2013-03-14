data = require('../fixtures/bus_stops')

var BusStop = function ( id, attributes ) {

  this.id        = id
  this.latitude  = attributes.latitude
  this.longitude = attributes.longitude

}

BusStop.prototype = {

}

BusStop.idFromString = function ( string ) {
  if (!string) string = ""
  return ( string.match(/\d{3,}/)  || [] )[0]
}

BusStop.findByQuestion = function ( question ) {
  var id = BusStop.idFromString( question.body )

  if (attrs = data[id]) {
    return new BusStop(id, attrs)
  }
}

module.exports = BusStop
