import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateLink from './components/CreateLink';
import Header from './components/Header';
import LinksList from './components/LinksList';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={LinksList} exact />
        <Route path="/create" component={CreateLink} />
      </Switch>
    </Router>
  );
}

export default App;
