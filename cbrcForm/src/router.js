import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/index/IndexPage';
import AdminPage from './routes/admin/AdminPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/admin" exact component={AdminPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
