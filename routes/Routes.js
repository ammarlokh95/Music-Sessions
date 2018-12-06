import express from 'express';

import homeRoute from './Home/Home';
import spotify_login from './Login/SpotifyLoginRoutes';
import logoutRoute from './Logout/Logout';

const router = express.Router();

/* GET home page. */
router.get('', (req, res) => homeRoute(req, res));

// GET /logout
// Logs the user out of the app and redirects to Login
// Clears cookie
router.get('/logout', (req, res) => logoutRoute(req, res));
// use spotify_login to handle login routes
router.use('/login', spotify_login);

module.exports = router;
