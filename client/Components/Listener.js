/**
 * Listener.js
 */
import React from 'react';
import PropTypes from 'prop-types';

import onHostPlayerStateChanged from '../socket-client';

class Listener extends React.Component {
  componentWillReceiveProps(nextProps) {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const { player } = nextProps;

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
        console.log(state);
      });
      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // recieve playback change
      onHostPlayerStateChanged((err, host_player) => {
        console.log(host_player);
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
      <div className="Listener">
        <h1>You are listening</h1>
      </div>
    );
  }
}

Listener.propTypes = {
  player: PropTypes.object.isRequired,
};

export default Listener;
