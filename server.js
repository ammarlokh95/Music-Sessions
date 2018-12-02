const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const http = require('http');
const app = express();

const routes = require('./routes/Login/routes');

// Bodyparser MW
app.use(bodyParser.json());

// cookieParser middleware
app.use(cookieParser());
// Login flow
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use((err, req, res, next) => {
  res.status = err.status || 500;
  res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
  next();
});

// view engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

// Serve static assets if in Prod
if (process.env.NODE_ENV === 'production') {
  // Set Static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

/**
 * Simple logger function.
 */
function log(message) {
  process.stdout.write(`${message}\n`);
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || 5000);
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
let availablePort = port;

/**
 * Listen on provided port, on all network interfaces.
 */
function startServer(serverPort) {
  server.listen(serverPort);
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = `${typeof port === 'string' ? 'Pipe' : 'Port'} ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      if (availablePort - port < 10) {
        availablePort += 1;
        startServer(availablePort);
      } else {
        log(`${bind} is already in use`);
        process.exit(1);
      }
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = `${typeof addr === 'string' ? 'pipe' : 'port'} ${
    typeof addr === 'string' ? addr : addr.port
  }`;
  log(`Server is listening on ${bind}`);
  log(`Visit: http://localhost:${addr.port}`);
}

/**
 * Start server.
 */

server.on('error', onError);
server.on('listening', onListening);

startServer(availablePort);
module.exports = server;
