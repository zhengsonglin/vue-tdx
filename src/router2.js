import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import RouteConfig from './routes/routes';

function descRouter(app, dyRoutes) {
	return dyRoutes.map((route, i) => {
    const { path, name, layout, routes, redirect, ...dynamics } = route;

	if (routes && routes.length) {
		return (
			//<Route path={path}  key={name}  component={dynamic({app, ...dynamics})} >{descRouter(app, routes)}</Route>

			<Route path={path} key={name} render={(props) => {
                const Component = dynamic({ app, ...dynamics })
                return (<Component {...props}> {descRouter(app, routes)} </Component>)
            }} />
		)
	} else {
		return (
			<Route path={path}  key={name} exact component={dynamic({app, ...dynamics})}/>
		);
	}
	});
}



function RouterConfig({ history, app }) {
	return (
		<Router history={history}>
			<Switch>
      {
		  descRouter(app, RouteConfig)
        //   routes.map(({ path, name, layout, routes, redirect, ...dynamics }) => {
        //     const Component = dynamic({ app, ...dynamics });
        //     return (
        //       <Route path={path} key={name}  component={dynamic({app, ...dynamics})}>
                 
        //       </Route>
        //     );
        //   })
        }
         
			</Switch>
		</Router>
	);
}
export default RouterConfig;
