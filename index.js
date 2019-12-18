// index.js - Main node File

// All the Packages to Be Required
const express = require('express');
const session = require('express-session');
const OAuth2Strategy = require('passport-oauth2');
const passport = require('passport');
const fs = require('fs')
const https = require('https')
const request = require("request-promise");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const FileStore = require('session-file-store')(session);

// Other Consts
const app = express();
const login = require('./routes/login.js');
const home = require('./routes/home.js');
const main_app = require('./routes/app.js')


// Set what to use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  name: 'ipb-app-sess', // CHANGE ME
  secret: '1234', // CHANGE ME
  saveUninitialized: true,
  resave: true,
  store: new FileStore(),
  cookie:{maxAge:6000}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('ipb-app-sess'); // CHANGE ME TO SAME AS ABOVE AS SESSION NAME
  }
  next();
});

passport.use(new OAuth2Strategy({
    authorizationURL: '', // Auth URL from IPB
    tokenURL: '', // Token URL from IPB
    clientID: '', // client ID from IPB
    clientSecret: '', // Client Secret from IPB
    callbackURL: "https://urlofnode/login/auth/callback", // Node URL for Callback - this is the correct format for this project
  },
  function(accessToken, refreshToken, profile, cb) {
    var options = {
      uri: `/api/index.php?/core/me`, // IPB Get Request - See API docs on Admin CP for correct URL
      json: true,
      method: 'GET',
      headers: {
          authorization: `Bearer ${accessToken}`
      }
  };
   
  request(options)
      .then(function (parsedBody) {
        var name = parsedBody.name;
        var uid = parsedBody.id;
        var pgroup = parsedBody.primaryGroup.id;
        var pgroup_name = parsedBody.primaryGroup.name;
        console.log('Logged in: ' + name); // Useful for Dev - may get crowded, alternatively useful for logging?
        var user = { name: name, uid: uid, pgroup: pgroup, pgroup_name: pgroup_name};
        console.log(user); // Useful for Dev - may get crowded, alternatively useful for logging?
        console.log(''); // Useful for Dev - may get crowded, alternatively useful for logging?
        return cb(null, user);
      })
      .catch(function (err) {
        console.log(`Error: ${err.message}`)
      });


  }
));

//Pasport.js Crap Below - best to leave this alone
// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Application settings for viewing
app.use(express.static('public'))
app.set('view engine', 'ejs');

// all routing - handles all the geting and posting
app.use('/', home);
app.use('/login', login);
app.use('/app', main_app);

// Logout - runs independent of other routing
app.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
})

// Use Letsencrypt on the URL and simply paste in the correct values below - runs port 443 for https
https.createServer({
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('cert.pem'),
  ca: fs.readFileSync('fullchain.pem')
}, app).listen(443, () => {
  console.log('Site is open and listening on port 443!')
})