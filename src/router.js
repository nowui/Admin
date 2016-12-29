import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';
import Main from './view/Main';
import ProductIndex from './view/product/ProductIndex';

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Route path="/">
        <IndexRedirect to="product/index"/>
        <Route component={Main}>
          <Route path="product/index" component={ProductIndex}/>
        </Route>
      </Route>
    </Router>
  );
}

export default RouterConfig;
