var express = require('express');
var router = express.Router();

/* url = /dashboard */
router.get('/', (req, res) => {
  res.render('dashboard/index', { 
      title: 'Smart Motocycle - Dashboard',
      menu: 'dashboard'
    });
});

module.exports = router;
