var express = require('express');
var router = express.Router();

var SafeZone = require('../models/safezone.js')

/* url = /safe-zones */
router.get('/', (req, res) => {
  SafeZone.getAllSafeZones((safe_zones) => {
    res.render('safe-zones', { 
      title: 'Smart Motocycle - Create New Safe Zones',
      menu: 'safe-zones',
      safe_zones: safe_zones
    });
  });
});

/* url = /safe-zones/create */
router.get('/create', (req, res) => {
  
  res.render('safe-zones/create', { 
      title: 'Smart Motocycle - Create New Safe Zones',
      menu: 'safe-zones'
    });
});

router.post('/create', (req, res) => {
  var name = req.body.name;
  var zoom  = req.body.zoom;
  var zone;
  try{
    zone = JSON.parse(req.body.safe_zone);
  }catch(ex){
    
  }
  
  if(isNaN(zoom)){
    res.render('safe-zones/create', { 
          title: 'Smart Motocycle - Create New Safe Zones',
          menu: 'safe-zones',
          error: 'invalid-data'
        });
        return;
  }
  
  if(typeof zone == 'object' && zone.length >= 3){
    var safezone = new SafeZone(name, zone, zoom);
    safezone.save( (success) => {
      if(success){
        res.redirect('/safe-zones');
      }else{
        res.render('safe-zones/create', { 
          title: 'Smart Motocycle - Create New Safe Zones',
          menu: 'safe-zones',
          error: 'zone-already-exists'
        });
      }
    });
    
  }else{
    res.render('safe-zones/create', { 
      title: 'Smart Motocycle - Create New Safe Zones',
      menu: 'safe-zones',
      name: name,
      error: 'invalid-zone'
    });
  }
});

module.exports = router;
