import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import VConsole from 'vconsole';

import VueExpandFn from '@/assets/js/vueExpandFn.js'

Vue.use(VueExpandFn)

Vue.config.productionTip = false
import {
    Button,
    NavBar,
    Toast,
    Tabbar,
    TabbarItem,
    Swipe,
    SwipeItem,
    Lazyload,
    Col,
    Row,
    Icon,
    List,
    PullRefresh,
    CellGroup,
    Cell,
    Grid,
    GridItem,
    Image,
    Search,
    Tab,
    Tabs,
    Dialog,
    Form,
    Field,
    RadioGroup,
    Radio,
    Uploader,
    Picker,
    Popup,
    Area,
    Overlay,
    Notify,
    Empty,
    DropdownMenu,
    DropdownItem,
    TreeSelect,
    Progress
} from 'vant';

Vue.use(Button).use(NavBar).use(Toast).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem);
Vue.use(Lazyload).use(Col).use(Row).use(Icon).use(List).use(PullRefresh).use(CellGroup).use(Cell).use(Grid).use(GridItem);
Vue.use(Image).use(Search).use(Tab).use(Tabs).use(Dialog).use(Form).use(Field).use(RadioGroup).use(Radio).use(Uploader);
Vue.use(Picker).use(Popup).use(Area).use(Overlay).use(Notify).use(Empty).use(DropdownMenu).use(DropdownItem).use(TreeSelect)
Vue.use(Progress)


import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

const isDebug = false; // 本地开发调试注入vConsole
( isDebug && new VConsole() )

// 本地开启mock模拟, 此处是拦截ajax请求，如果是拦截响应数据(请求已发送)，需要在vue.config.js中配置before函数，然后调用mock-server中
// 本地拦截请求是无法在浏览器观察到xhr请求信息，响应拦截请求则是通过express服务重新发送一个请求，然后mock模拟返回值,可以看到xhr请求信息
// vue.config.js中配置before函数是编译时调用，而main.js文件是运行时调用，如同时开启本地mock会覆盖mock-server
const openMock = false;
if(openMock){
    const { mockXHR } = require('../mock')
    mockXHR()
}
// ( openMock && mockXHR() )

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
