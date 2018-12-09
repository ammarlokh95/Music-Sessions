/**
 * Listener.js
 */
import React from 'react';
import PropTypes from 'prop-types';

import { onHostPlayerStateChanged } from '../SocketClient';

class Listener extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.player = props.player;
  }

  componentDidMount() {
    console.log(this.player);
    if (this.player) {
      this.addEventHandlers();
    }
  }

  componentDidUpdate(prevProps, nextProps) {
    if (prevProps.player !== nextProps.player) {
      if (nextProps.player) this.addEventHandlers();
    }
  }

  addEventHandlers = () => {
    console.log('Adding event handlers');
    // Error handling
    this.player.addListener('initialization_error', ({ message }) => {
      console.error(message);
    });
    this.player.addListener('authentication_error', ({ message }) => {
      console.error(message);
    });
    this.player.addListener('account_error', ({ message }) => {
      console.error(message);
    });
    this.player.addListener('playback_error', ({ message }) => {
      console.error(message);
    });
    // Playback status updates
    this.player.addListener('player_state_changed', (state) => {
      console.log(state);
    });
    // Ready
    this.player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      this.setState({
        isLoading: false,
      });
    });

    // recieve playback change
    onHostPlayerStateChanged((err, host_player) => {
      console.log(host_player);
    });
    // Not Ready
    this.player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });
    // Connect to the player!
    this.player.connect();
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div className="Listener">
        {isLoading ? <h1>Spotify is loading</h1> : <h1>You are listening</h1>}
      </div>
    );
  }
}

Listener.propTypes = {
  player: PropTypes.object.isRequired,
};

export default Listener;
