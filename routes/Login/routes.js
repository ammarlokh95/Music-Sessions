const express = require('express');
const router = express.Router();
const spotify_login = require('./spotify-login');

/* GET home page. */
router.get('', (req, res) => {
  console.log(req.cookies);
  var data = req.cookies.SPOTIFY;

  if (data) {
    console.log(data);
    if (data.expiration_time < Date.now()) {
      res.status = 200;
      res.redirect('/login/refresh');
    } else {
      if (data.access_token) {
        res.status = 200;
        res.render('index', {
          access_token: data.access_token
        });
      }
    }
  }
  res.redirect('/login/');
});

// use spotify_login to handle login routes
router.use('/login', spotify_login);

module.exports = router;
