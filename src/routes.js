import React from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { Parts } from './screens/Parts';
import { Cart } from './screens/Cart';
import { Branches } from './screens/Branches';
import { NoMatch } from './screens/NoMatch';
import { NavBar } from './components/NavBar';
import { Admin } from './screens/Admin';
import { SwaggerAPI } from './screens/SwaggerAPI';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <NavBar />
      <div style={{paddingTop: 52, margin: 0}}></div>
      <Switch>
        <Route exact path="/Home" component={HomeScreen} />
        <Route exact path="/Parts" component={Parts} />
        <Route exact path="/Branches" component={Branches} />
        <Route exact path="/Cart" component={Cart} />
        <Route exact path="/Admin" component={Admin} />
        <Route exact path="/api" component={SwaggerAPI} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route component={NoMatch} />
      </Switch>
    </div>
  )
}
