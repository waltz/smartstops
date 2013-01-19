var express = require('express'),
    api = require(__dirname + '/restapi/resources');

var app = express();
app.use(express.bodyParser()); // To parse JSON request bodies

// REST API URIs
app.post('/api/v1/questions', api.v1.questions.post);

// Serve all other URIs as static files from the "public" directory.
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
