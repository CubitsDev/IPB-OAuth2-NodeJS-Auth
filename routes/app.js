// app.js - responsible for all the app rendering

var express = require('express');
var router = express.Router();
var fs = require('fs');
var config;

fs.readFile('./config.json', 'utf8', function (err, data) {
    if (err) throw err;
    config = JSON.parse(data);
  });

router.get('/', function (req, res) {
  if (req.user) {
    if (config.allowedGroups.gid.includes(req.user.pgroup)) {
      res.render('pages/app_home.ejs', {name: req.user.name});
    } else {
      res.render('pages/error_no_access.ejs', {group: req.user.pgroup_name})
    }
  } else {
    res.redirect('/login');
  }
})

module.exports = router;
