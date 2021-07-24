import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Event from './components/Event';
import EventDetail from './components/EventDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Layout>
          <ScrollToTop>
            <Route path="/event-detail/:i_id">
              <EventDetail />
            </Route>
            <Route path="/event">
              <Event />
            </Route>
            <Route path="/"></Route>
          </ScrollToTop>
        </Layout>
      </Switch>
    </Router>
  );
}
export default App;
