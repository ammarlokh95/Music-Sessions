/**
 * Host.js
 */
import React from 'react';
import PropTypes from 'prop-types';

import emitHostPlayerStateChanged, connectToListener from '../socket-client';

class Host extends React.Component {
  componentWillReceiveProps(nextProps) {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const { player } = nextProps;

      // Listen for new connections
      var currentState;
      connectToListener(currentState)

      // Error handling
      player.addListener('initialization_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('authentication_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('account_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('playback_error', ({ message }) => {
        console.error(message);
      });
      // Playback status updates
      player.addListener('player_state_changed', (state) => {
        currentState = state;
        emitHostPlayerStateChanged(state);
      });
      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });
      // Connect to the player!
      player.connect();
    };
  }

  render() {
    return (
      <div className="Host">
        <h1>You are hosting the session</h1>
      </div>
    );
  }
}

Host.propTypes = {
  player: PropTypes.object.isRequired,
};

export default Host;
