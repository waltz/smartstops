var fs = require('fs'),
    proc = require('child_process'),
    async = require('async'),
    twilio = require('twilio');

exports.post = function(req, res, next) {
    
    var MODULES_DIR_PATH = 'modules.d/'

    var moduleInput = {
        latitude: 37.775,
        longitude: -122.413,
        message: req.body.Body,
        phoneNumber: req.body.From
    }
    
    var moduleScores = {};
    var scoreModule = function(file, callback) {

        var module = proc.spawn(MODULES_DIR_PATH + file, [ 'score' ]);

        var score = '';
        module.stdout.on('data', function(data) {
            score += data;
        });

        module.stdin.write(JSON.stringify(moduleInput));
        module.stdin.end();

        module.on('exit', function(code) {
            if (code === 0) {
                moduleScores[file] = score;
                callback();
            } else {
                callback(code);
            }
        });

    }

    var runModule = function(file, callback) {
                
        var module = proc.spawn(MODULES_DIR_PATH + file, [ 'run' ]);

        var message = '';
        module.stdout.on('data', function(data) {
            message += data;
        });

        module.stdin.write(JSON.stringify(moduleInput));
        module.stdin.end();

        module.on('exit', function(code) {
            if (code === 0) {
                callback(null, message);
            } else {
                callback(code);
            }
        });

    }

    // Loop over modules and get their scores
    fs.readdir(MODULES_DIR_PATH, function(err, files) {

        async.forEach(files, scoreModule, function(err, results) {

            var chosenModule;
            var highestScore = -1;
            for (module in moduleScores) {
                var score = moduleScores[module];
                if (score > highestScore) {
                    highestScore = score;
                    chosenModule = module;
                }
            }

            runModule(chosenModule, function(err, output) {

                var twiml = new twilio.TwimlResponse();
                twiml.sms(output);
                res.send(twiml.toString());    

            });

        });

    });

}
