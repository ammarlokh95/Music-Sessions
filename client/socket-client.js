import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');
export const onHostPlayerStateChanged = (cb) => {
  socket.on('player_state_changed', player => cb(player));
};

export const emitHostPlayerStateChanged = (state) => {
  socket.emit('player_state_changed', state);
};

export const connectToHost = (cb) => {
  socket.emit('establish_connection');

  socket.on('connection_established', state => cb(state));
};

export const connectToListener = (state) => {
  socket.on('establish_connection', () => {
    if (!state) {
      console.error('User is not playing music through the Web Playback SDK');
      socket.emit('connection-failed', state);
      return;
    }
    socket.emit('sending_connection', state);
  });
};
