var express = require('express');
var router = express.Router();

var hackathoners = require('../hackathoners');
var models = hackathoners.db.model;
var socket = hackathoners.socket;

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
          groupname: req.body.groupname
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

/**
 * Repository를 추가합니다.
 */
router.post('/repo/add', function(req, res, next) {
  // 먼저 중복 검사를 수행합니다.
  models.Repositories.findOne({ where: {reponame: req.body.reponame} }).then(result => {
    if (result) {
      res.json({
        result: 1,
        error_desc: "이미 존재하는 Repository 이름입니다."
      });
    } else {
      // 중복 검사를 통과했다면, 새로운 Repository를 추가합니다.
      models.Repositories.findOrCreate({
        where: {
          username: req.body.username,
          reponame: req.body.reponame,
          commits: req.body.commits || 0
        }, 
      }).spread((user, created) => {
        console.log("[+] /repo/add : 새로운 Repository가 추가되었습니다 : \n", user.get({plain: true}));
        res.json({
          result: 0,
          member: user.get({plain: true})
        });
      });
    }
  });
});


/**
 * 팀을 추가합니다.
 */
router.post('/team/add', function(req, res, next) {
  // 먼저 중복 검사를 수행합니다.
  models.Teams.findOne({ where: {name: req.body.name} }).then(result => {
    if (result) {
      res.json({
        result: 1,
        error_desc: "이미 존재하는 팀 이름입니다."
      });
    } else {
      // 중복 검사를 통과했다면, 새로운 Team를 추가합니다.
      models.Teams.findOrCreate({
        where: {
          name: req.body.name,
          members: req.body.members,
          repos: req.body.repos
        }, 
      }).spread((user, created) => {
        console.log("[+] /team/add : 새로운 팀이 추가되었습니다 : \n", user.get({plain: true}));
        res.json({
          result: 0,
          member: user.get({plain: true})
        });
      });
    }
  });
});

/**
 * 전광판에 Rank 정보를 보냅니다.
 */
router.get("/rank", function(req, res, next) {
  var result_sample = [
    {
      name: "LecRec", 
      amount: 35,
      cph: 5
    },
    {
      name: "국민택시",
      amount: 28,
      cph: 4
    },
    {
      name: "국고나라 사기꾼",
      amount: 25,
      cph: 3
    },
    {
      name: "돌려방",
      amount: 22,
      cph: 3
    },
    {
      name: "WorkHard",
      amount: 16,
      cph: 2
    },
    {
      name: "TDD Hub",
      amount: 10,
      cph: 4
    }
  ];

  var result = [];
  models.Teams.all().then(teams => {
    result = teams.map((v) => ({name: v.name, amount: 0, cph: 0}));
  }).then(() => {
    models.Commits.all().then(commits => {
      commits.forEach((value, index, array) => {
        result.forEach((v, i, a) => {
          if (value.teamname == v.name) {
            result[i].amount += 1;
            var hours = (new Date(value.timestamp).getTime() - new Date().getTime()) / (1000 * 60 * 60);
            console.log("[+] " + Math.abs(Math.floor(hours)) + "의 시간차가 있습니다.");
            if (Math.abs(hours) <= 2) {
              result[i].cph += 1;
            }
          }
        });
      });
      res.status(200);
      res.json(result);
    });
  });
});
module.exports = router;
