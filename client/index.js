/**
 * index.js
 */
import React from 'react';
import { render } from 'react-dom';

import './styles.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Host from './Components/Host';
import Listener from './Components/Listener';

class MainApp extends React.Component {
  constructor() {
    super();
    this.state = {
      token: window.access_token,
      interval: window.interval,
      player: {},
      isLoading: true,
    };
    // check every second for the player.
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
  }

  componentDidUpdate(prevProps, nextProps) {
    if (prevProps.token !== nextProps.token) {
      this.state.player.getOAuthToken = (cb) => {
        cb(nextProps.token);
      };
    }
  }

  checkForPlayer = () => {
    const { token } = this.state;
    console.log(token);
    if (window.Spotify) {
      clearInterval(this.playerCheckInterval);
      const player = new window.Spotify.Player({
        name: 'Music Sessions',
        getOAuthToken: (cb) => {
          cb(token);
        },
      });
      this.setState({
        isLoading: false,
        player,
      });
      console.log(window.Spotify);
    }
  };

  // Sets the token and periodically refreshs token
  getToken = () => {
    const { interval } = this.state;
    const intervalFn = function intervalFunction() {
      console.log('refreshing token');
      fetch('/login/refresh')
        .then(res => res.json())
        .then((data) => {
          this.setState(state => ({
            token: data.access_token,
            interval: data.interval,
            player: {
              ...state.player,
              getOAuthToken: (cb) => {
                cb(data.access_token);
              },
            },
          }));
          setTimeout(intervalFunction(), data.interval);
        })
        .catch(err => console.log(err));
    };
    setTimeout(intervalFn(), interval);
  };

  render() {
    const { isLoading, player } = this.state;
    return (
      <Router>
        <div className="MainApp">
          <Route path="/host" render={props => <Host {...props} player={player} />} />
          <Route path="/listen" render={props => <Listener {...props} player={player} />} />
          {isLoading ? (
            <p>Spotify Player is Loading</p>
          ) : (
            <div className="Links">
              <Link to="/host">Host</Link>
              <br />
              <Link to="/listen">Join</Link>
            </div>
          )}
        </div>
      </Router>
    );
  }
}

// render the app
render(<MainApp />, document.getElementById('app'));
