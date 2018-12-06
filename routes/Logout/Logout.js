// Logs the user out of the app and redirects to Login
// Clears cookie
const logoutRoute = (req, res) => {
  res.clearCookie('SPOTIFY');
  res.clearCookie('io');
  res.clearCookie('state');
  res.redirect('/login/');
};

export default logoutRoute;
