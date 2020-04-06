import React from 'react';
import './App.scss';
import Dashboard from './containers/Dashboard';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
