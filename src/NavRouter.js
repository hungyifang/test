import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Event from './Event';

const NavRouter = () => {
  return (
    <Router>
      <>
        <NavBar />
        <Switch>
          <Route path="/event">
            <Event />
          </Route>
          <Route exact path="/"></Route>
        </Switch>
      </>
    </Router>
  );
};

export default NavRouter;
