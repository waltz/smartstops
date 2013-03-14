var SmartStops = require('../../../smart_stops')

// Import the required Node modules.
var fs     = require('fs'),
    proc   = require('child_process'),
    async  = require('async'),
    twilio = require('twilio'),
    busStopData = require(process.cwd() + '/lib/sf_busstop_locations.json'),
    File = require('file-utils').File;

    var MODULES_DIR_PATH = 'modules.d/'

// Read the Post data
exports.post = function( req, res ) {

  var question = new SmartStops.Models.Question( req.body )
  var stop     = SmartStops.Models.BusStop.findByQuestion(question)

  // Figure out if there is a bus stop in the question, short
  // circuit if not.
  if (stop) {
    console.log("Bus stop found")
  } else {
    console.log("Could not locate bus stop")
    var twiml = new twilio.TwimlResponse();
    twiml.sms("Sorry, we couldn't locate your bus stop!");
    res.send(twiml.toString());    
    return;
  }    

  var repo = SmartStops.Models.Chooser.findBestRepo(question);
  
    Response.send(repo.answer(question));

    var twiml = new twilio.TwimlResponse();
    twiml.sms(repo.answer
    res.send(twiml.toString());

    // var moduleInput = {
    //     busStopId:   stop.id,
    //     latitude:    stop.latitude,
    //     longitude:   stop.longitude,
    //     message:     question.body,
    //     phoneNumber: question.From
    // }
    
    // var moduleScores = {};
    // var scoreModule = function(file, callback) {

    //     var path = process.cwd() + "/" + MODULES_DIR_PATH + file;

    //     new File(path).canExecute(function(err, executable) {
            
    //         if (executable) {

    //             var module = proc.spawn(path, [ 'score' ]);
                
    //             var score = '';
    //             module.stdout.on('data', function(data) {
    //                 score += data;
    //             });
                
    //             module.stdin.write(JSON.stringify(moduleInput));
    //             module.stdin.end();
                
    //             module.on('exit', function(code) {
    //                 if (code === 0) {
    //                     moduleScores[file] = score;
    //                     callback();
    //                 } else {
    //                     callback(code);
    //                 }
    //             });

    //         }

    //     });

    // }

    // var runModule = function(file, callback) {
                
    //     var module = proc.spawn(MODULES_DIR_PATH + file, [ 'run' ]);

    //     var message = '';
    //     module.stdout.on('data', function(data) {
    //         message += data;
    //     });

    //     module.stdin.write(JSON.stringify(moduleInput));
    //     module.stdin.end();

    //     module.on('exit', function(code) {
    //         if (code === 0) {
    //             callback(null, message);
    //         } else {
    //             callback(code);
    //         }
    //     });

    // }

    // // Loop over modules and get their scores
    // fs.readdir(MODULES_DIR_PATH, function(err, files) {

    //     async.forEach(files, scoreModule, function(err, results) {

    //         var chosenModule;
    //         var highestScore = -1;
    //         for (module in moduleScores) {
    //             var score = moduleScores[module];
    //             if (score > highestScore) {
    //                 highestScore = score;
    //                 chosenModule = module;
    //             }
    //         }

    //         runModule(chosenModule, function(err, output) {

    //             var twiml = new twilio.TwimlResponse();
    //             twiml.sms(output);
    //             res.send(twiml.toString());    

    //         });

    //     }, function() {
    //         console.log("Finsihed running modules.");
    //     });

    // });
  
}
