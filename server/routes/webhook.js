var express = require('express');
var request = require('request');
var router = express.Router();

var hackathoners = require('../hackathoners');
var models = hackathoners.db.model;
var socket = hackathoners.socket;

/**
 * 각 팀들의 Github Project에서 나오는 PushEvent Webhook을 처리합니다.
 * Webhook의 형식은 다음 링크를 참조하십시오 :
 * https://developer.github.com/v3/activity/events/types/#pushevent
 * 
 * Header의 경우 위조 방지를 위해 [!] 표시 항목에 대하여 무결성 검사를 선행합니다 :
 *   POST /payload HTTP/1.1
 *   ...
 *   [!] X-Github-Delivery: [UUID]
 *   [!] User-Agent: GitHub-Hookshot/[고유 문자]
 *   [!] X-GitHub-Event: push
 */
router.post('/', function(req, res, next) {
  var payload = req.body;

  /**
   * socket.io를 통해 클라이언트로 전달되는 Parameter입니다.
   * 아래에서 사람을 뜻하는 owner, pusher, committer 따위의 요소들은
   * "name", "email"을 포함하는 JSON Object입니다.
   */
  var result = {
    // Repository 관련 내용입니다.
    repo: {
      // Repository의 이름입니다.
      name: payload.repository.name,
      // Repository의 소유자입니다. JSON Object로 되어있습니다.
      owner: payload.repository.owner
    },
    // Push를 발생시킨 사람입니다. JSON Object로 되어있습니다.
    pusher: payload.pusher,
    // Head Commit에 대한 내용입니다.
    commit: {
      // Commit Message입니다.
      message: payload.head_commit.message,
      // Commit Timestamp입니다.
      timestamp: payload.head_commit.timestamp,
      // Commit을 한 사람입니다. JSON Object로 되어있습니다.
      // committer는 상기한 속성 외에 "username"이 추가로 붙어있습니다.
      committer: payload.head_commit.committer,
      // 해당 Repository의 전체 Commit Count입니다. 하단의 request를 통해서 반영됩니다.
      full_count: undefined
    }
  }

  var options = {
    url: "https://api.github.com/repos/" + payload.repository.full_name,
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function(error, response, body) {
    result.commit.full_count = JSON.parse(response.body).size;
    socket.users.forEach(function(value, index, array) {
      value.emit("new_commit", result);
    }); 
    res.status(200);
    res.json(result);
  });
});

module.exports = router;
