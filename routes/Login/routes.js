const express = require('express');
const router = express.Router();
const spotify_login = require('./spotify-login');

/* GET home page. */
router.get('', (req, res) => {
  var spotify_deets = req.cookies.SPOTIFY;
  if (spotify_deets) {
    if (spotify_deets.data.expiration_time < Date.now()) {
      res.redirect('/login/refresh');
    } else {
      console.log(spotify_deets.data.access_token);
      res.render('index', {
        access_token: spotify_deets.data.access_token
      });
    }
  } else res.redirect('/login/');
});

// use spotify_login to handle login routes
router.use('/login', spotify_login);

module.exports = router;
