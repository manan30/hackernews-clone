import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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
        <Route exact path="/">
          <Redirect to="/new/1" />
        </Route>
        {/* <Route path="/" component={LinksList} exact /> */}
        <Route exact path="/top" component={LinksList} />
        <Route exact path="/new/:page" component={LinksList} />
        <Route path="/create" component={CreateLink} />
        <Route path="/login" component={Login} />
        <Route path="/search" component={Search} />
      </Switch>
    </>
  );
}

export default App;
