// ----------------------------
// Chooser Dependencies
//-----------------------------

var Repositories = require("../repositories")

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
  var repository = new Repositories.foursquare( this.question, this.response )
  return repository
}

module.exports = Chooser
