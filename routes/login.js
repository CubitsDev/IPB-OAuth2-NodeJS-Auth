// login.js - responsible for routing all login pages etc

var express = require('express');
const OAuth2Strategy = require('passport-oauth2');
const passport = require('passport');

var router = express.Router();

// Main Login Page Route

router.get('/', function (req, res) {
    res.render('pages/login.ejs');
});

router.get('/a', function (req, res) {
  res.send(req.user.name + " " + req.user.pgroup);
});

router.get('/auth', passport.authenticate('oauth2', { scope: ['profile']}), function(req, res) {
  // The request will be redirected to IPB for authentication, so we won't actually use this function
});

router.get('/auth/callback',
  passport.authenticate('oauth2', { failureRedirect: '/logout' }),
  function(req, res) {
    // Successful authentication, redirect home.
    req.session.save();
    res.redirect('/app');
  });



module.exports = router;
