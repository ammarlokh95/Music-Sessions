const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Bodyparser MW
app.use(bodyParser.json());

app.get('/login', function(req, res) {
  var scopes = 'user-read-private user-read-email';
  res.redirect(
    'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      my_client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent(redirect_uri)
  );
});

// Serve static assets if in Prod
if (process.env.NODE_ENV === 'production') {
  // Set Static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
