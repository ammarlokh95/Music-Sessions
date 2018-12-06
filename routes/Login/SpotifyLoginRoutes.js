import express from 'express';
import {
  loginRoute,
  loginAuthRoute,
  loginCallbackRoute,
  loginRefreshRoute,
} from './SpotifyLoginActions';

const router = express.Router();

// GET: /login
// Displays logiin langing page

router.get('/', (req, res) => loginRoute(req, res));

// GET: /login/auth
// Fetch authorization code from spotify
router.get('/auth', (req, res) => loginAuthRoute(req, res));

// GET: /login/callback
// Receives authorization code as param and fetches access token
// sends access token to Client
router.get('/callback', (req, res) => loginCallbackRoute(req, res));

// GET: /login/refresh
// Receives access token using refresh token (received from client in header)
// sends access token to Client
router.get('/refresh', (req, res) => loginRefreshRoute(req, res));

export default router;
