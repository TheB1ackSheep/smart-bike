var express = require('express');
var router = express.Router();

var Motocycles = require('../models/motocycle.js')

/* url = /bikes */
router.get('/', (req, res) => {
  Motocycles.getAllMotocycles((bikes) => {
    res.render('bikes/index', { 
      title: 'Smart Motocycle - Bikes',
      menu: 'bikes',
      bikes: bikes
    });
  });
  
});

module.exports = router;
