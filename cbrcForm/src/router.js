import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/index/IndexPage';
import AdminPage from './routes/admin/AdminPage';
import UserPage from './routes/user/UserPage';



function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/admin" exact component={AdminPage} />
        <Route path="/user" exact component={UserPage} />

       
        {/* <Route path="/table1" exact component={Table1} />
        <Route path="/table2" exact component={Table2} /> */}
       
      </Switch>
    </Router>
  );
}

export default RouterConfig;
