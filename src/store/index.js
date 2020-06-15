import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import storage from 'good-storage';

export default new Vuex.Store({
	state: {
		userLoginInfo: storage.get("userLoginInfo", {}),
		advertisingList: [{
				id: "1",
				text: "全国商品免费包邮领取"
			},
			{
				id: "2",
				text: "【紧急通知】禁止吸粉"
			},
			{
				id: "3",
				text: "淘大熊商家操作教程"
			},
			{
				id: "4",
				text: "平台内测，实名认证"
			},
			{
				id: "5",
				text: "实名认证联系客服审核"
			},
			{
				id: "6",
				text: "【必读】放单节奏问题"
			},
		],
	},
	mutations: {
		setUserLoginInfo(state, userLoginInfo) {
			storage.set("userLoginInfo", userLoginInfo)
			//storage.set("tdx-Login", userLoginInfo);
			state.userLoginInfo = userLoginInfo
		}
	},
	actions: {},
	modules: {}
})