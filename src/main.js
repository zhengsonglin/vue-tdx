import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import VueExpandFn from '@/assets/js/vueExpandFn.js'
Vue.use(VueExpandFn)

Vue.config.productionTip = false
import { Button, NavBar, Toast, Tabbar, TabbarItem, Swipe, SwipeItem, Lazyload, Col, Row,  Icon, List, PullRefresh, CellGroup, Cell,
				Grid, GridItem, Image, Search, Tab, Tabs, Dialog, Form, Field, RadioGroup, Radio, Uploader, Picker, Popup, Area, Overlay,
				Notify, Empty, DropdownMenu, DropdownItem, TreeSelect  } from 'vant';

Vue.use(Button).use(NavBar).use(Toast).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem);
Vue.use(Lazyload).use(Col).use(Row).use(Icon).use(List).use(PullRefresh).use(CellGroup).use(Cell).use(Grid).use(GridItem);
Vue.use(Image).use(Search).use(Tab).use(Tabs).use(Dialog).use(Form).use(Field).use(RadioGroup).use(Radio).use(Uploader);
Vue.use(Picker).use(Popup).use(Area).use(Overlay).use(Notify).use(Empty).use(DropdownMenu).use(DropdownItem).use(TreeSelect)


import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
