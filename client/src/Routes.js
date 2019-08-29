/* eslint-disable react/no-multi-comp */
import React, {useEffect} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import useSession from './hooks/useSession';

import {
  ThemeDashboard,
  ThemeProductList,
  ThemeUserList,
  ThemeTypography,
  ThemeIcons,
  ThemeAccount,
  ThemeSettings,
  ThemeSignUp,
  ThemeSignIn,
  ThemeNotFound,
  Login,
  Bunq
} from './views';

const Routes = () => {
  
  return (
    <Switch>
      
      <Redirect
        exact
        from="/"
        to="/home"
      />
      <RouteWithLayout 
        component={Login}
        exact
        layout={MainLayout}
        path="/home"
      />
      <RouteWithLayout 
        component={Login}
        exact
        layout={MinimalLayout}
        path="/login"
      />
      <RouteWithLayout 
        component={ThemeDashboard}
        exact
        layout={MainLayout}
        path="/private"
        protectedRoute
      />
      <RouteWithLayout 
        component={Bunq}
        exact
        layout={MainLayout}
        path="/bunq"
        protectedRoute
      />
      <RouteWithLayout 
        component={ThemeDashboard}
        exact
        layout={MainLayout}
        path="/theme/dashboard"
      />
      <RouteWithLayout        
        component={ThemeUserList}
        exact
        layout={MainLayout}
        path="/theme/users"
      />
      <RouteWithLayout        
        component={ThemeProductList}
        exact
        layout={MainLayout}
        path="/theme/products"
      />
      <RouteWithLayout        
        component={ThemeTypography}
        exact
        layout={MainLayout}
        path="/theme/typography"
      />
      <RouteWithLayout        
        component={ThemeIcons}
        exact
        layout={MainLayout}
        path="/theme/icons"
      />
      <RouteWithLayout        
        component={ThemeAccount}
        exact
        layout={MainLayout}
        path="/theme/account"
      />
      <RouteWithLayout 
        component={ThemeSettings}
        exact
        layout={MainLayout}
        path="/theme/settings"
      />
      <RouteWithLayout 
        component={ThemeSignUp}
        exact
        layout={MinimalLayout}
        path="/theme/sign-up"
      />
      <RouteWithLayout 
        component={ThemeSignIn}
        exact
        layout={MinimalLayout}
        path="/theme/sign-in"
      />
      <RouteWithLayout 
        component={ThemeNotFound}
        exact
        layout={MinimalLayout}
        path="/theme/not-found"
      />
      <Redirect to="/theme/not-found" />
    </Switch>
  );
};

export default Routes;
