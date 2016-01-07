var db = require('../../../helpers/models');

// clean wizard menu
db.settings.Update(
  {"type" : "properties"},
  { $pull: { "data.admin": "posts"} },
  {w: 1}, function() {
  // add new menues
  db.settings.Update(
    {"type" : "properties"},
    { $push: { "data.admin": "posts"} }
  );
});

