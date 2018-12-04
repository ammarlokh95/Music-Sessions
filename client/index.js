/**
 * index.js
 */
import React from 'react';
import { render } from 'react-dom';

import './styles.css';
import Host from './Components/Host';
import Listener from './Components/Listener';

class MainApp extends React.Component {
  player = {};

  componentDidMount = () => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      let { access_token } = window;
      let { interval } = window;
      this.player = new Spotify.Player({
        name: 'Music Sessions',
        getOAuthToken: (cb) => {
          cb(access_token);
        },
      });
      // Sets the token and periodically refreshs token

      const intervalFunction = () => {
        console.log('refreshing token');
        fetch('/login/refresh')
          .then(res => res.json())
          .then((data) => {
            console.log(data);
            access_token = { data };
            interval = { data };
            this.player.getOAuthToken(access_token);
            setTimeout(internalFunction, interval);
          })
          .catch(err => console.log(err));
      };
      if (interval < 0) {
        interval = 0;
      }
      setTimeout(intervalFunction, interval);
    };
  };

  renderChild = component => <component player={this.player} />;

  render() {
    return (
      <div className="MainApp">
        <button type="button" onClick={this.renderChild(Host)}>
          Host
        </button>
        <button type="button" onClick={this.renderChild(Listener)}>
          Join
        </button>
      </div>
    );
  }
}

// render the app
render(<MainApp />, document.getElementById('app'));
