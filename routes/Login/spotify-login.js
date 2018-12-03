const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const urlencoded = require('form-urlencoded').default;

function generateState() {
  let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let state = '';
  for (let i = 0; i < 16; i++) {
    let index = Math.floor(Math.random() * 36);
    state += chars.charAt(index);
  }
  return state;
}

// GET: /login
// Displays logiin langing page

router.get('/', function(req, res) {
  res.status(200).render('login');
});

// GET: /login/auth
// Fetch authorization code from spotify
router.get('/auth', function(req, res) {
  console.log('redirecting to authorize');
  console.log(process.env.REDIRECT_URI);
  var redirect_uri = process.env.REDIRECT_URI;
  var my_client_id = process.env.SPOTIFY_ID;
  var scopes =
    'streaming user-read-birthdate user-read-private user-read-email';
  var state = generateState();
  res.cookie('state', state, {
    expires: new Date(Date.now() + 900000),
    httpOnly: true
  });

  var url =
    'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' +
    my_client_id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' +
    encodeURIComponent(redirect_uri) +
    '&state=' +
    encodeURIComponent(state);

  res.redirect(url);
});

// GET: /login/callback
// Receives authorization code as param and fetches access token
// sends access token to Client
router.get('/callback', function(req, res) {
  console.log('callback');
  var state = req.cookies['state'];
  if (state !== req.query.state) {
    console.log('state Not matching');
    res.redirect('/login/auth');
  }
  if (req.query.error) {
    res.send(req.query.error);
  }
  if (req.query.code) {
    console.log('Obtained code, getting access token');
    var code = req.query.code;
    var body = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.REDIRECT_URI
    };
    fetch('https://accounts.spotify.com/api/token', {
      method: 'post',
      body: urlencoded(body),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`
          ).toString('base64')
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          res.redirect('/login/auth');
        }
        console.log('redirecting');
        res.cookie(
          'SPOTIFY',
          Object.assign(data, {
            expiration_time: Date.now() + data.expires_in * 1000
          }),
          {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
            httpOnly: true
          }
        );

        res.redirect('/');
      })
      .catch(err => res.send(err));
  }
});

// GET: /login/refresh
// Receives access token using refresh token (received from client in header)
// sends access token to Client
router.get('/refresh', function(req, res) {
  var refresh_token = req.cookies.SPOTIFY.refresh_token;
  console.log('refresh_token');
  if (!refresh_token) res.redirect('/login/auth/');
  var body = {
    grant_type: 'refresh_token',
    refresh_token: refresh_token
  };

  fetch('https://accounts.spotify.com/api/token', {
    method: 'post',
    body: urlencoded(body),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(
          `${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`
        ).toString('base64')
    }
  })
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        res.redirect('/login/auth');
      }
      res.cookie(
        'SPOTIFY',
        Object.assign(data, {
          refresh_token,
          expiration_time: Date.now() + data.expires_in * 1000
        }),
        {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
          httpOnly: true
        }
      );
      res.status(200).send({
        access_token: data.access_token,
        expires_in: data.expires_in * 1000
      });
    })
    .catch(err => res.send(err));
});

module.exports = router;
