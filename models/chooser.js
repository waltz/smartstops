var Repositories = require("../repositories")

var Chooser = function ( question, response ) {
  this.question = question
  this.response = response
}

Chooser.prototype = {

  findBestRepo: function () {
    var repository = new Repositories.Foursquare( this.question, this.response )  
    return repository
  }

}

module.exports = Chooser
