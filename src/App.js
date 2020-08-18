import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateLink from './components/CreateLink';
import Header from './components/Header';
import LinksList from './components/LinksList';
import Login from './components/Login';
import Search from './components/Search';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={LinksList} exact />
        <Route path="/create" component={CreateLink} />
        <Route path="/login" component={Login} />
        <Route path="/search" component={Search} />
      </Switch>
    </>
  );
}

export default App;
