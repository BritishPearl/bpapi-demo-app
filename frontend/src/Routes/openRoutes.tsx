import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Registration from '../Views/Registration';
import Login from '../Views/Login';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/registration' component={Registration} />
        <Redirect to='/login' />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
