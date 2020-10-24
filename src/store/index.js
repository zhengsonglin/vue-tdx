import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import storage from 'good-storage';

export default new Vuex.Store({
    state: {
        userLoginInfo: storage.session.get("userLoginInfo", {}),
        advertisingList: [
            {
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
        categoryList: storage.session.get("categoryList", []),    //商品类别
        loginType: storage.session.get("loginType", null),    //登录类型, tdx或txx
        lastOrderType: storage.session.get("lastOrderType", '1')//缓存的订单类型 1.限量免单订单，2.熊抢购订单
    },
    mutations: {
        setLoginType(state, loginType){
            storage.session.set("loginType", loginType)
            state.loginType = loginType
        },
        setUserLoginInfo(state, userLoginInfo) {
            storage.session.set("userLoginInfo", userLoginInfo)
            state.userLoginInfo = userLoginInfo
        },
        setCategoryList(state, categoryList) {
            storage.session.set("categoryList", categoryList)
            state.categoryList = categoryList
        },
        setLastOrderType(state, lastOrderType){
            storage.session.set("lastOrderType", lastOrderType)
            state.lastOrderType = lastOrderType
        },
        cleanAllState(state){
            state.loginType = null
            state.userLoginInfo = {}
            state.categoryList = []
            state.lastOrderType = '1'
            storage.clear()
            storage.session.clear()
        }
    },
    actions: {},
    modules: {}
})
