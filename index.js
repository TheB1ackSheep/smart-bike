var express = require('express');
var app = express();

/* import app controllers */
var dashboard = require('./controllers/dashboard.js');
var bikes = require('./controllers/bikes.js');
var safe_zone = require('./controllers/safe-zones.js');
var history = require('./controllers/history.js');

app.set('view engine', 'pug');
app.use(express.static('public'));

/* middleware for routing */
app.get('/', function(req, res){
  res.redirect('/dashboard');
});
app.use('/dashboard', dashboard);
app.use('/bikes', bikes);
app.use('/safe-zones', safe_zone);
app.use('/history', history);

app.listen(3000, function () {
  console.log('app is listening on port 3000!');
});
