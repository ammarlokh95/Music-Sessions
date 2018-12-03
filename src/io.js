const app = require('./app');
const server = require('./server');
var io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('player_state_changed', function(state) {
    console.log('Emitting state');
    io.emit('player_state_changed', state);
  });
});
