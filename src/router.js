import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';
import Main from './view/Main';
import CodeIndex from './view/code/CodeIndex';
import ProductIndex from './view/product/ProductIndex';
import RoleIndex from './view/role/RoleIndex';

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Route path="/" ignoreScrollBehavior>
        <IndexRedirect to="role/index"/>
        <Route component={Main}>
          <Route path="code/index" component={CodeIndex}/>
          <Route path="product/index" component={ProductIndex}/>
          <Route path="role/index" component={RoleIndex}/>
        </Route>
      </Route>
    </Router>
  );
}

export default RouterConfig;
