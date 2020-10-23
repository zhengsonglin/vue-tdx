import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import routes from './routes/routes';
import { convertRoutes } from 'dva-router-config';

function RouterConfig({ app, history }) {
	return (
	  <Router history={history}>
		{convertRoutes(routes, { app })}
	  </Router>
	);
  }

export default RouterConfig;
