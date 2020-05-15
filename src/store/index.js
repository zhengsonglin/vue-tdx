import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import storage from 'good-storage';

export default new Vuex.Store({
	state: {
		userLoginInfo: storage.get("userLoginInfo", {})
	},
	mutations: {
		setUserLoginInfo(state, userLoginInfo) {
			storage.set("userLoginInfo", userLoginInfo)
			state.userLoginInfo = userLoginInfo
		}
	},
	actions: {},
	modules: {}
})