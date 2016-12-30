import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';
import Main from './view/Main';
import ProductIndex from './view/product/ProductIndex';
import CodeIndex from './view/code/CodeIndex';

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Route path="/" ignoreScrollBehavior>
        <IndexRedirect to="code/index"/>
        <Route component={Main}>
          <Route path="product/index" component={ProductIndex}/>
          <Route path="code/index" component={CodeIndex}/>
        </Route>
      </Route>
    </Router>
  );
}

export default RouterConfig;
