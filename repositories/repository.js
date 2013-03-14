var Repository = function () {

}

Repository.prototype = {
  answer: function ( question, stop ) {
    throw "This method must be defined in the inherited class"
  }
}

Repository.canRespondTo = function ( question ) {
  throw "This method must be defined in the inherited class"
}

module.exports = Repository
