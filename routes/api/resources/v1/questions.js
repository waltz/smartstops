var Models = require(process.cwd() +'/models')

exports.post = function( req, res ) {

  var question = new Models.question( req.body ),
      response = new Models.response( res )

  if ( question.valid() ) {
    var chooser    = new Models.chooser( question, response )
    var repository = chooser.findBestRepo()
    repository.respond()
  } else {
    response.sms( "Sorry, we couldn't locate your bus stop!" )
  }
  
  console.log("Question Asked: " + question.body + " From: " + question.from)
}
