var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// routes carousel in signView
router.get('/schedule', function(req, res) {
  res.render('schedule');
});
router.get('/rank', function(req, res) {
  res.render('rank');
});
router.get('/information', function(req, res) {
  res.render('information');
});

module.exports = router;
