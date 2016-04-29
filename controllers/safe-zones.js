var express = require('express');
var router = express.Router();

/* url = /safe-zones */
router.get('/', function(req, res) {
  res.render('safe-zones/index', { 
      title: 'Smart Motocycle - Safe Zones',
      menu: 'safe-zones'
    });
});

/* url = /safe-zones/create */
router.get('/create', function(req, res) {
  res.render('safe-zones/create', { 
      title: 'Smart Motocycle - Create New Safe Zones',
      menu: 'safe-zones'
    });
});

module.exports = router;
