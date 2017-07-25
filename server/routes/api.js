var express = require('express');
var router = express.Router();

var hackathoners = require('../hackathoners');
var models = hackathoners.db.model;

/**
 * 서버 상태를 확인합니다.
 */
router.get('/', function(req, res, next) {
  res.json({
      version: "1.0.0",
      uptime_server: process.uptime(),
      uptime_system: require('os').uptime()
  });
});

/**
 * 멤버를 추가합니다.
 */
router.post('/member/add', function(req, res, next) {
  // 먼저 중복 검사를 수행합니다.
  models.Members.findOne({ where: {email: req.body.email} }).then(result => {
    if (result) {
      res.json({
        result: 1,
        error_desc: "이미 존재하는 E-mail 주소입니다."
      });
    } else {
      // 중복 검사를 통과했다면, 새로운 Member를 추가합니다.
      models.Members.findOrCreate({
        where: {
          name: req.body.name,
          phone: req.body.phone,
          email: req.body.email,
          github: req.body.github,
          group: req.body.group
        }, 
      }).spread((user, created) => {
        console.log("[+] /member/add : 새로운 멤버가 추가되었습니다 : \n", user.get({plain: true}));
        res.json({
          result: 0,
          member: user.get({plain: true})
        });
      });
    }
  });
});

module.exports = router;
