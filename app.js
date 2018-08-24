// Load the SDK for JavaScript
var AWS = require('aws-sdk');
var express = require('express');
var bodyParser = require('body-parser');
var Dynamite = require('dynamite');
var creds = require('./appjs/creds.js');
var app = express();

app.use(express.static('views'));
app.use(express.static('_assets'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Set the region 
AWS.config.update({region: 'us-west-2'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log(creds.hasOwnProperty('accessKeyId') && creds.hasOwnProperty('secretAccessKey'));

var options = {
  region: 'us-west-2',
  accessKeyId: creds.accessKeyId,
  secretAccessKey: creds.secretAccessKey
};

var client = new Dynamite.Client(options);

/************
 * Helper functions
 ************/
String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

/**************
 * AWS DynamoDB functions
 **************/
 
function readTopo(climbname){
   client.getItem('Climbs')
  .setHashKey('ClimbNumber', climbname.hashCode.toString())
  .setRangeKey('Version', '1')
  .execute()
  .then(function(data) {
    console.log('hello');
    console.log(data.result);
  })
}

function storeTopo(climbname, climbversion, name, topo, notes, time){
  //console.log(client.describeTable('Climbs'));
    client.putItem('Climbs', {
    ClimbNumber: climbname.hashCode().toString(),
    Version: climbversion,
    ClimbName: climbname,
    Name: name,
    JSONtopo: topo,
    Notes: notes,
    Time: time
  }).execute();
}

/***********************
 * Express routes 
 ***********************/


// root endpoint
//
app.get("/", function (req, res) {
  res.sendFile(__dirname+'/views/index.html');
});

app.get("/newclimb", function (req, res) {
  res.sendFile(__dirname+'/views/newclimb.html');
});

app.get("/climb", function (req, res) {
  res.sendFile(__dirname+'/views/climb.html');
});

app.get("/viewclimb", function (req, res) {
  res.sendFile(__dirname+'/views/viewclimb.html');
});


app.get("/topo/:climbid/", function (req, res) {
    client.newQueryBuilder('Climbs')
    .setHashKey('ClimbNumber', req.params.climbid)
    .execute()
    .then(function (data) {
    // data.result is an array of posts whose hash key is `post1`
    res.send(data);
  });
});

//endpoints to access database 

app.post('/savetopo', function(req, res) {
  // checks for empty strings
  for (let bodyAtt in req.body) {
    if (bodyAtt === '') {
      res.send('ERROR: can not handle empty string');
    }
  }
      client.newQueryBuilder('Climbs')
      .setHashKey('ClimbNumber', req.body.route.hashCode().toString())
      .getCount()
      .execute()
      .then(function (data) {
        console.log(data.Count);
        if(data.Count>0){
          let retData = {createStatus:"That name already exists", climbid:" " };
          res.send(JSON.stringify(retData));
        }
        else{
          let retData = {createStatus:"Success"  ,climbid: req.body.route.hashCode().toString()};
          
         
          storeTopo(req.body.route, "1", req.body.name, req.body.topojson, req.body.notes, new Date().toUTCString());
         console.log('presend: '+retData.climbid+' '+retData.createStatus);
         res.send(JSON.stringify(retData));
        }
      });
      
    
  

});

app.post('/savenewtopo', function(req, res) {
  // checks for empty strings
  for (let bodyAtt in req.body) {
    if (bodyAtt === '') {
      res.send('ERROR: can not handle empty string');
    }
  }
  var currtime= +new Date();
  storeTopo(req.body.route, req.body.ver, req.body.name, req.body.topojson, req.body.notes, new Date().toUTCString());
  res.send('success!');
});


app.get('/gettopo', function(req, res) {
  let data = readTopo(req.query.climbnumber, req.query.version); 
  console.log(req.query, 'got topo');
  res.send(data);
});

// listen for requests :) 
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//funtion get item 
//funtion hashtopo