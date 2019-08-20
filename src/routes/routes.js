import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import { HomePage, AboutPage } from 'pages';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/about" exact component={AboutPage} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
