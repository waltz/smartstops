// ----------------------------
// Chooser Dependencies
//-----------------------------

var Repositories = require("../repositories"),
    _            = require("underscore")

// ----------------------------
// Chooser
//-----------------------------

/**
 * A function that determines which repository is most
 * qualified to answer a given question
 */

var Chooser = function ( question, response ) {

  this.question = question
  this.response = response

}

// ----------------------------
// Chooser Instance Methods
//-----------------------------

/**
 * Finds the most qualified repository to answer a
 * given question
 */

Chooser.prototype.findBestRepo = function () {
  var sort = _.bind(function (repository) {
    return repository.answerability(this.question)
  }, this)

  var Repository = _(Repositories)
    .chain()
    .values()
    .sortBy(sort)
    .first()
    .value()

  return new Repository( this.question, this.response )
}

module.exports = Chooser
