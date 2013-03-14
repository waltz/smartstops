var PORT = 5000

var express = require('express'),
    api     = require('./routes/api/resources'),
    http    = require('http'),
    path    = require('path')

var app = express()

app.configure(function () {
  app.set( 'port', process.env.PORT || PORT)
  app.use( express.logger('dev') )
  app.use( express.bodyParser() )
  app.use( express.methodOverride() )
  app.use( app.router )
})

app.post( '/api/v1/questions', api.v1.questions.post )

http.createServer( app ).listen( app.get('port'), function () {
  console.log( 'Listening on port ' + app.get('port') )
})
