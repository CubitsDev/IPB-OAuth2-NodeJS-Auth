// app.js - responsible for literally just the index

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
    res.redirect('/app')
  } else {
    res.redirect('/login');
  }
})

module.exports = router;
