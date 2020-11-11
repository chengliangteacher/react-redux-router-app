import React from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import routes from './router';
import RouterItems from '../components/RouterItems';
export default function RouterConfig() {
  return (
    <Router>
      <Switch>
        <RouterItems routes={routes} />
      </Switch>
    </Router>
  );
}
