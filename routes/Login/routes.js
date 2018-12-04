import express from 'express';
import spotify_login from './spotify-login';

const router = express.Router();

function getJSON(data) {
  if (data.constructor === 'test'.constructor) {
    return JSON.parse(data);
  }
  return data;
}

/* GET home page. */
router.get('', (req, res) => {
  console.log(req.cookies);
  let data = req.cookies.SPOTIFY;
  if (data) {
    data = getJSON(data);
    if (data.expiration_time < Date.now()) {
      console.log('AT expired');
      fetch('/login/refresh')
        .then(resp => resp.json())
        .then((resp_data) => {
          data.access_token = resp_data.access_token;
          data.expires_in = resp_data.expires_in;
        });
    }
    if (data.access_token) {
      console.log('rendering index');
      res.render('index', {
        access_token: data.access_token,
        expires_in: data.expires_in * 1000,
      });
      return;
    }
  }
  console.log('redirecting to login');
  res.redirect('/login/');
});

// GET /logout
// Logs the user out of the app and redirects to Login
// Clears cookie
router.get('/logout', (req, res) => {
  res.clearCookie('SPOTIFY');
  res.clearCookie('io');
  res.clearCookie('state');
  res.redirect('/login/');
});
// use spotify_login to handle login routes
router.use('/login', spotify_login);

module.exports = router;
