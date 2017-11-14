var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('enterparams', { title: 'Express' });
});


router.get('/api/getparameters', function(req, res, next) {

  //TODO: get these from the database, just returning
  //also returning 3 parameters to show how it's done
  var paramObj = {
    "windSpeed": 'medium',
    "dropletDiameterType": 'nozzle', //the value of the drop down in html
    "dropletDiameterA": 33,
    "dropletDiameterB": 22
    //NOTE: for now just add extra parameters in here
  };

  //return the parameters back as a JSON string
  res.send( JSON.stringify(paramObj))
});

// do the run of the python model, but for now just return dummy data
router.post('/api/runmodel', function(req, res, next) {
  var resultObj = {
    'status': 'complete',
    'results': ['header1, header2, header3, header4', '20, 30, 23, 65', '23, 12, 45, 23']
  };

  //send the object back as a JSON string so it can be processed by the client
  res.send( JSON.stringify(resultObj) );               //send back the results
});

module.exports = router;
