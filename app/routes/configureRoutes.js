import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from '../containers/App/';
import Main from '../components/Main/';

const basePath = process.env.NODE_ENV === 'production' ? '/game-of-life/' : '/';

export default function configureRoutes(history) {
  return (
    <Router history={history}>
      <Route path={basePath} component={App}>
        <IndexRoute component={Main} />

      </Route>
    </Router>
  );
}
