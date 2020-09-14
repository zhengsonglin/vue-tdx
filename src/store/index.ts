import Vue from 'vue';
import Vuex from 'vuex';
import storage from 'good-storage';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    foo: '',
    bar: '',
    baz: '',
    qux: '',
    user: '张三',
    phone: '123456',
    // 上面都是测试数据
    userLoginInfo: storage.get('userLoginInfo', {}),
    advertisingList: [{
        id: '1',
        text: '全国商品免费包邮领取'
      },
      {
        id: '2',
        text: '【紧急通知】禁止吸粉'
      },
      {
        id: '3',
        text: '淘大熊商家操作教程'
      },
      {
        id: '4',
        text: '平台内测，实名认证'
      },
      {
        id: '5',
        text: '实名认证联系客服审核'
      },
      {
        id: '6',
        text: '【必读】放单节奏问题'
      }
    ]
  },
  getters: {
    email(state: any): string {
      return state.phone + '@qq.com';
    },
    gfoo(state: any): string {
      return 'getterFoo';
    },
    gBar(state: any): string {
      return 'getterBar';
    },
  },
  mutations: {
    setMuFoo(state: any, value: any): void {
      console.log('mutations foo')
    },
    setMuBaz(state: any, value: any): void {
      console.log('mutations baz')
    },
    setQux(state: any, value: any): void {
      console.log('mutations qux')
    },
    setUserLoginInfo(state: any, userLoginInfo: any) {
      storage.set('userLoginInfo', userLoginInfo)
      // storage.set("tdx-Login", userLoginInfo);
      state.userLoginInfo = userLoginInfo
    }
  },
  actions: {
    // { commit, state } = context
    setAcFoo(context: any, paylod: any): void {
      console.log('actions foo')
      context.commit('setMuFoo', paylod.num);
    },
    setAcBaz(context: any, paylod: any): void {
      console.log('actions baz')
      context.commit('setMuBaz', paylod.num);
    },
  },
  modules: {}
});
