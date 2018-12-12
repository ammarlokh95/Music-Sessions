import fetch from 'node-fetch';
import urlencoded from 'form-urlencoded';

function generateState() {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let state = '';
  for (let i = 0; i < 16; i += 1) {
    const index = Math.floor(Math.random() * 36);
    state += chars.charAt(index);
  }
  return state;
}

// Displays logiin langing page

export const loginRoute = (req, res) => {
  res.status(200).render('login');
};

// Fetch authorization code from spotify
export const loginAuthRoute = (req, res) => {
  console.log('redirecting to authorize');
  console.log(process.env.REDIRECT_URI);
  const redirectURI = process.env.REDIRECT_URI;
  const myClientID = process.env.SPOTIFY_ID;
  const scopes = process.env.SCOPES;
  const state = generateState();
  res.cookie('state', state, {
    expires: new Date(Date.now() + 900000),
    httpOnly: true
  });

  const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${myClientID}${
    scopes ? `&scope=${encodeURIComponent(scopes)}` : ''
  }&redirect_uri=${encodeURIComponent(redirectURI)}&state=${encodeURIComponent(
    state
  )}`;

  res.redirect(url);
};

// Receives authorization code as param and fetches access token
// sends access token to Client
export const loginCallbackRoute = (req, res) => {
  const { state } = req.cookies;
  if (state !== req.query.state) {
    console.log('state Not matching');
    res.redirect('/login/auth');
  }
  if (req.query.error) {
    res.send(req.query.error);
  }
  if (req.query.code) {
    console.log('Obtained code, getting access token');
    const { code } = req.query;
    const body = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.REDIRECT_URI
    };
    fetch('https://accounts.spotify.com/api/token', {
      method: 'post',
      body: urlencoded(body),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`
        ).toString('base64')}`
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
            expiration_time: Date.now() + data.expires_in * 1000 - 5000
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
};

// Receives access token using refresh token (received from client in header)
// sends access token to Client
export const loginRefreshRoute = (req, res) => {
  const { refresh_token } = req.cookies.SPOTIFY;
  console.log('refresh_token');
  if (!refresh_token) res.redirect('/login/auth/');
  const body = {
    grant_type: 'refresh_token',
    refresh_token
  };

  fetch('https://accounts.spotify.com/api/token', {
    method: 'post',
    body: urlencoded(body),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`
      ).toString('base64')}`
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
          expiration_time: Date.now() + data.expires_in * 1000 - 5000
        }),
        {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
          httpOnly: true
        }
      );
      res.status(200).send({
        access_token: data.access_token,
        interval: data.expiration_time - Date.now()
      });
    })
    .catch(err => res.send(err));
};
