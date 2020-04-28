import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'

Vue.config.productionTip = false
import { Button, NavBar, Toast, Tabbar, TabbarItem, Swipe, SwipeItem, Lazyload, Col, Row,  Icon, List, PullRefresh,  Cell  } from 'vant';

Vue.use(Button).use(NavBar).use(Toast).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem);
Vue.use(Lazyload).use(Col).use(Row).use(Icon).use(List).use(PullRefresh).use(Cell);

import API from '@/api/getDatas.js'
Vue.prototype.API = API

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
