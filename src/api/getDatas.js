import $http from '@/axiosConfig/axios.init'

export default {
	//发送短信验证码
    sendCode: (params, config) => $http.post("/Web/SendShotMsg", params, config).then((rsp) => {
		return rsp.data
    }),
    //用户注册
    register: (params, config) => $http.post("/Web/CheckBuyrRegister", params, config).then((rsp) => {
		return rsp.data
    }),
    //用户登录
    login: (params, config) => $http.postByQS("/Mobile/LoginCheck", params, config).then((rsp) => {
		return rsp.data
    }),
    //获取CheckKDJ
    checkKDJ: (params, config) => $http.post("/Mobile/CheckKDJ", params, config).then((rsp) => {
		return rsp.data
    }),
    //找回密码(发验证码)
    getBackPwd: (params, config) => $http.post("/Mobile/GetBackPwd", params, config).then((rsp) => {
		return rsp.data
    }),
    //编辑密码
    editPwd: (params, config) => $http.post("/Mobile/EditPwd", params, config).then((rsp) => {
		return rsp.data
    }),
    //获取首页商品列表
    getProductList: (params, config) => $http.post("/Mobile/GetMobileData", params, config).then((rsp) => {
		return rsp.data
    }),
    
}    