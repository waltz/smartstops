var Repository = function () {

}

Repository.prototype = {
  answer: function ( question, stop ) {
    throw "This"
  }
}

Repository.canRespondTo = function ( question ) {
  throw "This method must be defined in a subclass"
}

module.exports = Repository
