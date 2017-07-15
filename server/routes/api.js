var express = require('express');
var router = express.Router();

/**
 * For checking server status.
 */
router.get('/', function(req, res, next) {
  res.json({
      version: "1.0.0",
      uptime_server: process.uptime(),
      uptime_system: require('os').uptime()
  });
});

module.exports = router;
