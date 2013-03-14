var BusStop = require('./bus_stop')

var Question = function ( question ) {

  this.from = question.From
  this.body = question.Body

  var stop = BusStop.findByQuestion( this )

  if (stop) {
    this.location = stop.location
  }
}

Question.prototype = {

  keywords: function () {
    return this.from
  },

  valid: function () {
    return !!( this.location )
  }

}

module.exports = Question
