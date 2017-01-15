import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';
import Main from './view/Main';
import Login from './view/Login';
import DashboardIndex from './view/dashboard/DashboardIndex';
import CodeIndex from './view/code/CodeIndex';
import ProductIndex from './view/product/ProductIndex';
import RoleIndex from './view/role/RoleIndex';
import CategoryIndex from './view/category/CategoryIndex';
import AdminIndex from './view/admin/AdminIndex';
import AuthorizationIndex from './view/authorization/AuthorizationIndex';

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Route path="/">
        <IndexRedirect to="category/index"/>
        <Route path="login" component={Login}/>
        <Route component={Main}>
          <Route path="dashboard/index" component={DashboardIndex}/>
          <Route path="code/index" component={CodeIndex}/>
          <Route path="product/index" component={ProductIndex}/>
          <Route path="role/index" component={RoleIndex}/>
          <Route path="category/index" component={CategoryIndex}/>
          <Route path="admin/index" component={AdminIndex}/>
          <Route path="authorization/index" component={AuthorizationIndex}/>
        </Route>
      </Route>
    </Router>
  );
}

export default RouterConfig;
