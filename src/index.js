import dva from 'dva';
import './index.less';
import createLoading from 'dva-loading';
import './utils/rem'
//const _createBrowserHistory = require("history").createBrowserHistory;
//const _createHashHistory = require("history").createHashHistory;
// 1. Initialize
const app = dva({
    //history: _createHashHistory()
});

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
 app.model(require('./models/global').default);

// 4. Router
// app.router(require('./router').default); //使用dva-router-config插件方式渲染路由
app.router(require('./router2').default);

// 5. Start
app.start('#root');

export default app._store; // eslint-disable-line
