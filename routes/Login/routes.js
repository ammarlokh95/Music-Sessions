const express = require('express');
const router = express.Router();
const spotify_login = require('./spotify-login');

function getJSON(data) {
  if (data.constructor === 'test'.constructor) {
    return JSON.parse(data);
  }
  return data;
}

/* GET home page. */
router.get('', (req, res) => {
  console.log(req.cookies);
  var data = req.cookies.SPOTIFY;
  if (data) {
    data = getJSON(data);
    if (data.expiration_time < Date.now()) {
      console.log('AT expired');
      fetch('/login/refresh')
        .then(res => res.json())
        .then(access_token => {
          data.access_token = access_token;
        });
    }
    if (data.access_token) {
      console.log('rendering index');
      res.render('index', {
        access_token: data.access_token,
        expires_in: data.expires_in * 1000
      });
      return;
    }
  }
  console.log('redirecting to login');
  res.redirect('/login/');
});

// use spotify_login to handle login routes
router.use('/login', spotify_login);

module.exports = router;
