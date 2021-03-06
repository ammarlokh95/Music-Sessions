/**
 * index.js
 */
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';

import '../styles.css';
import Host from './Host';
import Listener from './Listener';
import store from '../Store';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      token: window.token,
      interval: window.interval,
      player: {},
      isLoading: true,
    };
    // check every second for the player.
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
  }

  checkForPlayer = () => {
    const { token } = this.state;
    console.log(token + " in app.js");
    if (window.Spotify) {
      clearInterval(this.playerCheckInterval);
      const player = new window.Spotify.Player({
        name: 'Music Sessions',
        getOAuthToken: (cb) => {
          cb(token);
        },
      });
      this.setState(
        {
          isLoading: false,
          player,
        },
        () => this.getToken(),
      );
      console.log(window.Spotify);
    }
  };

  // Sets the token and periodically refreshs token
  getToken = () => {
    const { interval } = this.state;
    console.log(interval);
    const intervalFn = () => {
      console.log('refreshing token');
      fetch('/login/refresh')
        .then(res => res.json())
        .then((data) => {
          window.token = data.access_token;
          this.setState(
            state => ({
              token: data.access_token,
              interval: data.interval,
              player: {
                ...state.player,
                getOAuthToken: (cb) => {
                  cb(data.access_token);
                },
              },
            }),
            this.getToken(),
          );
        })
        .catch(err => console.log(err));
    };
    setTimeout(() => intervalFn(), interval);
  };

  render() {
    const { isLoading, player } = this.state;
    return (
      <Provider store={store}>
        <Router>
          <div className="main-app">
            <Route path="/host" render={props => <Host {...props} player={player} />} />
            <Route path="/listen" render={props => <Listener {...props} player={player} />} />
            <Route
              exact
              path="/"
              render={() => (
                <div>
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
              )}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(App);
