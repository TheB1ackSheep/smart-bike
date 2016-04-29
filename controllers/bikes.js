var express = require('express');
var router = express.Router();

/* url = /bikes */
router.get('/', function(req, res) {
  res.render('bikes/index', { 
      title: 'Smart Motocycle - Bikes',
      menu: 'bikes'
    });
});

module.exports = router;
