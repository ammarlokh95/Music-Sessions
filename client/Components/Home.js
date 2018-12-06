import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <Link to="/host">Host</Link>
    <br />
    <Link to="/listen">Join</Link>
  </div>

  // <div>
  //   <button onClick={this.props.currentComponent = Host}> Host </button>
  //   <button onClick={this.props.currentComponent = Listener }> Listener</button>
  // </div>
);

export default Home;
