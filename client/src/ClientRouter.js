import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Container/Home';
import Host from './Container/Host';
import Listener from './Container/Listener';

const ClientRouter = () => (
  <Router>
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/host" component={Host} />
      <Route path="/listen" exact component={Listener} />
    </div>
  </Router>
);

export default ClientRouter;
