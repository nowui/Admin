import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';
import Main from './view/Main';
import CodeIndex from './view/code/CodeIndex';
import ProductIndex from './view/product/ProductIndex';
import RoleIndex from './view/role/RoleIndex';
import CategoryIndex from './view/category/CategoryIndex';
import AdminIndex from './view/admin/AdminIndex';

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Route path="/" ignoreScrollBehavior>
        <IndexRedirect to="role/index"/>
        <Route component={Main}>
          <Route path="code/index" component={CodeIndex}/>
          <Route path="product/index" component={ProductIndex}/>
          <Route path="role/index" component={RoleIndex}/>
          <Route path="category/index" component={CategoryIndex}/>
          <Route path="admin/index" component={AdminIndex}/>
        </Route>
      </Route>
    </Router>
  );
}

export default RouterConfig;
