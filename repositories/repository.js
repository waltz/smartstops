// ----------------------------
// Repository Template
//-----------------------------
var Repository = function ( question, response ) {

	this.question = question
	this.response = response

}

// ----------------------------
// Repository Class Methods
//-----------------------------

/**
 * Determines the likelihood with which the
 * given repository can answer a given
 * question
 * @parameter {Question} [question] the question one is
 * attempting to answer
 */

Repository.answerability = function ( question ) {
	return 0;
}

// ----------------------------
// Repository Instance Methods
//-----------------------------

/**
 * Responds to questions regarding venue near a
 * specific location
 */


Repository.prototype.respond = function () {
	this.response.sms("Some message back to the question asker.")
}