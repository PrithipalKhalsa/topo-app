// Load the SDK for JavaScript
var AWS = require('aws-sdk');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static('views'));
app.use(express.static('_assets'));
app.use(bodyParser.urlencoded({ extended: true })); 

// Set the region 
AWS.config.update({region: 'us-west-2'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

var docClient = new AWS.DynamoDB.DocumentClient();



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
}

/**************
 * AWS DynamoDB functions
 **************/
function storeTopo(climbname, climbversion, name, topo){
  var climbid = climbname.hashCode().toString();
  var params = {
  Item: {
   "ClimbNumber": {
     S: climbid
    }, 
   "Version": {
     S: climbversion
    }, 
    "ClimbName":{
      S:climbname
    },
   "Name": {
     S: name
    },
    "JSONtopo":{
     S: topo
    }
  }, 
  ReturnConsumedCapacity: "TOTAL", 
  TableName: "Climbs"
 };
 console.log("puttin");
 ddb.putItem(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
   
 });
}
/***********************
 * Express routes 
 ***********************/


// root endpoint
//
app.get("/", function (req, res) {
  res.sendFile(__dirname+'/views/index.html');
});

app.get("/topo/:climbid/version/:version", function (req, res) {
  var params = {
    TableName: "Climbs",
    KeyConditionExpression: "ClimbNumber = :a",
     ExpressionAttributeNames:{
     ":a": "climb"
     },
    ExpressionAttributeValues: {
        ":climb": req.params.climbid
    }
};
  ddb.query(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else    console.log(data);
   });
});

// endpoints to access database 
//
app.post('/savetopo', function(req, res) {
  // checks for empty strings
  for (let bodyAtt in req.body) {
    if (bodyAtt === '') {
      res.send('ERROR: can not handle empty string');
    }
  }
  
  storeTopo(req.body.routename, "1", req.body.name, req.body.topojson);
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