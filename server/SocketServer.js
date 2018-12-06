import '../app';
import io from 'socket.io';
import server from './Server';

const IO = io(server);
IO.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('player_state_changed', (state) => {
    console.log('Emitting state');
    IO.emit('player_state_changed', state);
  });
});
