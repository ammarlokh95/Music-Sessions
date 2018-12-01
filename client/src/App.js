import React, { Component } from 'react';
import './App.css';
import Player from './components/Player';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './spotify-player.css';
class App extends Component {
  render() {
    return (
      <div className='App'>
        <Player />
      </div>
    );
  }
}

export default App;
