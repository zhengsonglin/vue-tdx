import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'

Vue.config.productionTip = false
import { Button, NavBar, Toast } from 'vant';

Vue.use(Button).use(NavBar).use(Toast);

import API from '@/api/getDatas.js'
Vue.prototype.API = API

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
