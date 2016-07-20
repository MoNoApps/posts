
var controllers = require('../../../api/controllers');
var manager = require('../../../helpers/manager').response;
var db = require('../../../helpers/models');

function posts(req, res) {
  db.posts.Find({}, function(err, rsp) {
    res.json(rsp);
  });
}

module.exports = posts;
