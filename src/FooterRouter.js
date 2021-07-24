import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';

const FooterRouter = () => {
  return (
    <Router>
      <>
        <Footer />
        <Switch>
          <Route path="/event"></Route>
          <Route exact path="/"></Route>
        </Switch>
      </>
    </Router>
  );
};

export default FooterRouter;
