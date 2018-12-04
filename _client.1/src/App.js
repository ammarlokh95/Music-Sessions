import React, { Component } from 'react';
import './App.css';
import Player from './components/Player';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './spotify-player.css';
class App extends Component {
  redirectLink = () => {
    if (window.localStorage.getItem('refresh-token')) {
      console.log('refreshing');

      return 'http://localhost:5000/login/refresh';
    } else {
      console.log('Loggin in');
      return 'http://localhost:5000/login/';
    }
  };
  render() {
    return (
      <div className='App'>
        <Player />
        <a href='htttp://localhost:5000/login/'>Login</a>
      </div>
    );
  }
}

export default App;
