import React from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { Parts } from './screens/Parts';
import { PartsAlt } from './screens/PartsAlt';
import { Cart } from './screens/Cart';
import { Branches } from './screens/Branches';
import { NoMatch } from './screens/NoMatch';
import { NavBar } from './components/NavBar';
import { Admin } from './screens/Admin';
import { Reg } from './screens/Reg';
import { SwaggerAPI } from './screens/SwaggerAPI';
import { EmployeePanel } from './screens/EmployeePanel';
import { CustomerPanel } from './screens/CustomerPanel';
import { Route, Switch, Redirect } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


// optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
 
export const Routes = () => {
  return (
    <div>
    <AlertProvider template={AlertTemplate} {...options}>
      <NavBar />
      <div style={{paddingTop: 52, margin: 0}}></div>
      <Switch>
        <Route exact path="/Home" component={HomeScreen} />
        <Route exact path="/Parts" component={Parts} />
        <Route exact path="/PartsAlt" component={PartsAlt} />
        <Route exact path="/Branches" component={Branches} />
        <Route exact path="/Cart" component={Cart} />
        <Route exact path="/Reg" component={Reg} />
        <Route exact path="/Admin" component={Admin} />
        <Route exact path="/api" component={SwaggerAPI} />
        <Route exact path="/EmployeePanel" component={EmployeePanel} />
        <Route exact path="/CustomerPanel" component={CustomerPanel} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route component={NoMatch} />
      </Switch>
      </AlertProvider>
    </div>
  )
}
