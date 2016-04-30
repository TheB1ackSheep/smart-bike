var express = require('express');
var router = express.Router();

/* url = /history */
router.get('/', (req, res) => {
  res.render('history/index', { 
      title: 'Smart Motocycle - History',
      menu: 'history'
    });
});

module.exports = router;
