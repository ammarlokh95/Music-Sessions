import '../app';
import io from 'socket.io';
import server from './server';

const myIO = io(server);
myIO.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('player_state_changed', (state) => {
    console.log('Emitting state');
    myIO.emit('player_state_changed', state);
  });
});
