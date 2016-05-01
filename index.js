var express = require('express');
var bodyParser = require("body-parser");
var app = express();

/* import app controllers */
var dashboard = require('./controllers/dashboard.js');
var bikes = require('./controllers/bikes.js');
var safe_zone = require('./controllers/safe-zones.js');
var history = require('./controllers/history.js');

/* set jade as template engine */
app.set('view engine', 'pug');
/* middleware for static file and http req body parser */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* middleware for routing */
app.get('/', function(req, res){
  res.redirect('/dashboard');
});
app.use('/dashboard', dashboard);
app.use('/bikes', bikes);
app.use('/safe-zones', safe_zone);
app.use('/history', history);

/* start http server at port 3000 */
app.listen(3000, function () {
  console.log('[HTTP] app is listening on port 3000');
});


/* MQTT server */

var mosca = require('mosca');
var Firebase = require('firebase');

var server = new mosca.Server({ port: 1883 });

server.on('ready', () => {
  console.log('[MQTT] server is listening on port 1883');
});

server.on('clientConnected', (client) => {
    console.log('[MQTT] client connected', client.id);
});

/* if there is someone published data to our server */
server.on('published', (packet, client) => {
  var topic = packet.topic;
  var payload = packet.payload.toString();
  
  /* process topic /motocycles/[PLATE_NUMBER], note that plate number pattern is bike_[a-zA-Z0-9]] */
  
  if(topic.match('^\/motocycles\/bike_[a-zA-Z0-9]+$') && payload.isJson()){
    var id = topic.split('/')[2];
    var data = JSON.parse(payload);
    
    var db = new Firebase("https://smart-bike.firebaseio.com/motocycles");
    db.child(id).update({id:id, plate_number: data.plate_number, last_position: {lat: data.lat, lng: data.lng}});
    
    var db = new Firebase("https://smart-bike.firebaseio.com/motocycles/"+id+"/position");
    
    var position = {lat: data.lat, lng: data.lng, timestamp: new Date().getTime()};
    
    /* push lat lng data to db */    
    db.push(position);
    
    console.log('[MQTT] Incoming message:');
    console.log('\t', topic, payload);
    
    /* TODO : check lat lng if ouside the specific zone push notification to db */
  }
  
});


String.prototype.isJson = function () {
  try {
      JSON.parse(this.toString());
  } catch (e) {
      return false;
  }
  return true;
};
