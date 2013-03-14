var SmartStops = require(process.cwd() +'/smart_stops')

exports.post = function( req, res ) {

  var question = new SmartStops.Models.Question( req.body ),
      response = new SmartStops.Models.Response( res )

  if ( question.valid() ) {
    var chooser    = new SmartStops.Models.Chooser( question, response )
    var repository = chooser.findBestRepo()

    repository.respond()
  } else {
    response.sms( "Sorry, we couldn't locate your bus stop!" )
  }
  
}
