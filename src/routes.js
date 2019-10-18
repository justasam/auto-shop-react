import React from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { NoMatch } from './screens/NoMatch';
import { NavBar } from './components/NavBar';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <NavBar />
      <div style={{paddingTop: 52, margin: 0}}></div>
      <Switch>
        <Route exact path="/Home" component={HomeScreen} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route component={NoMatch} />
      </Switch>
    </div>
  )
}