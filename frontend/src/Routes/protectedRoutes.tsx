import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import OauthProxy from '../Components/OauthProxy';
import Portfolio from '../Views/Portfolio';
import Profile from '../Views/Profile';
import ForOfor from '../Views/404';


const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path='/' component={Portfolio} />
        <Route path='/portfolio' component={Portfolio} />
        <Route path='/profile' component={Profile} />
        <Route path='/login' render={()=><Redirect to="/profile" />} />
        <Route path='/registration' render={()=><Redirect to="/profile" />} />
        <Route path='/cb-bpapi' component={OauthProxy}/>
        <Route path='/404' component={ForOfor} />
        <Redirect to='/404' />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
