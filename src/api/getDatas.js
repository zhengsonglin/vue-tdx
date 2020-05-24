import $http from '@/axiosConfig/axios.init'

export default {
	//发送短信验证码
    sendCode: (params, config) => $http.post("/Mobile/SendMessage", params, config).then((rsp) => {
		return rsp.data
    }),
    //用户注册
    register: (params, config) => $http.post("/Mobile/RegisterCheck", params, config).then((rsp) => {
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
    //获取首页淘抢购商品列表
    getProductList: (params, config) => $http.post("/Mobile/GetMobileData", params, config).then((rsp) => {
		return rsp.data
    }),
    //获取首页熊抢购商品列表
    getSkillTaskList: (params, config) => $http.post("MobileSkill/GetSkillTaskList", params, config).then((rsp) => {
		return rsp.data
    }),
    
    //获取用户信息
    getIndexInfo: (params, config) => $http.post("/MobileUserCenter/GetIndexInfo", params, config).then((rsp) => {
		return rsp.data
    }),
    //获取用户定制金返款记录
    getUserRefound: (params, config) => $http.post("/MobileUserCenter/GetMobileUserRefound", params, config).then((rsp) => {
		return rsp.data
    }),
    //获取用户已预定商品
    getUserReserve: (params, config) => $http.post("/MobileUserCenter/Getreserve", params, config).then((rsp) => {
		return rsp.data
    }),
    //获取用户预定商品记录
    getUserReserveRecord: (params, config) => $http.post("/MobileUserCenter/GetreserveRecord", params, config).then((rsp) => {
		return rsp.data
    }),
    //删除预定商品明细记录
    deleteUserReserve: (params, config) => $http.post("/MobileUserCenter/DeleteReserve", params, config).then((rsp) => {
		return rsp.data
    }),
    //获取用户实名认证信息
    getLoginUserInfo: (params, config) => $http.post("/MobileUserCenter/GetLoginUserInfo", params, config).then((rsp) => {
		return rsp.data
    }),
    //强制修改用户认证信息(违规操作，请勿尝试)
    updateUserAuthentica: (params, config) => $http.postByQS("/api/TDX/ReallyNameAudit", params, config).then((rsp) => {
		return rsp.data
    }),
    //获取用户信息(银行卡)
    getUserInfo: (params, config) => $http.post("/MobileUserCenter/UserInfo", params, config).then((rsp) => {
		return rsp.data
    }),
    //获取地区支行信息
    getSubBranch: (params, config) => $http.post("/MobileUserCenter/GetSubBranch", params, config).then((rsp) => {
		return rsp.data
    }),
    //用户中心修改银行卡发送验证码
    sendShotMsg: (params, config) => $http.post("/MobileUserCenter/SendShotMsg", params, config).then((rsp) => {
		return rsp.data
    }),
    //用户中心绑定银行卡信息
    bindCardInfo: (params, config) => $http.post("/MobileUserCenter/BindCardInfo", params, config).then((rsp) => {
		return rsp.data
    }),
    //财务中心交易明细
    getPutForwardRecord: (params, config) => $http.post("/MobileUserCenter/GetPutForwardRecord", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询账户提现信息
    getWithDrawCashInfo: (params, config) => $http.post("/MobileUserCenter/GetWithDrawCashInfo", params, config).then((rsp) => {
		return rsp.data
    }),
    //申请账户提现
    handleWithDrawCash: (params, config) => $http.post("/MobileUserCenter/WithDrawCashInfo", params, config).then((rsp) => {
		return rsp.data
    }),
    //获取用户个人基本信息
    getBaseUserInfo: (params, config) => $http.post("/MobileUserCenter/GetBaseUserInfo", params, config).then((rsp) => {
		return rsp.data
    }),
    //设置用户个人基本信息
    setBaseUserInfo: (params, config) => $http.post("/MobileUserCenter/SetBaseUserInfo", params, config).then((rsp) => {
		return rsp.data
    }),
    //修改登录密码
    updatePwd: (params, config) => $http.post("/MobileUserCenter/UpdatePwd", params, config).then((rsp) => {
		return rsp.data
    }),
    //获取反馈内容列表
    getFeedBackList: (params, config) => $http.post("/MobileUserCenter/GetFeedBack", params, config).then((rsp) => {
		return rsp.data
    }),
    //添加反馈内容
    addFeedBack: (params, config) => $http.post("/MobileUserCenter/AddFeedBack", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询单条反馈意见信息
    getFeedBackDetail: (params, config) => $http.post("/MobileUserCenter/GetFeedBackDetail", params, config).then((rsp) => {
		return rsp.data
    }),
    //获取系统更新内容
    getSysInfo: (params, config) => $http.post("/MobileUserCenter/GetSysInfo", params, config).then((rsp) => {
		return rsp.data
    }),
    //获取淘抢购订单列表（任务列表）
    getTaskOrderList: (params, config) => $http.post("/MobileTaskCenter/GetTask", params, config).then((rsp) => {
		return rsp.data
    }),
    //获取熊抢购订单列表（任务列表）
    getSkillTaskOrderList: (params, config) => $http.post("/MobileSkill/GetTaskList", params, config).then((rsp) => {
		return rsp.data
    }),
    
    //查看售后订单列表(包含用户发起和商家发起)
    getTaskSaleList: (params, config) => $http.post("/MobileTaskCenter/GetTaskSale", params, config).then((rsp) => {
		return rsp.data
    }),
    //查看淘抢购商品信息
    getTaskInfo: (params, config) => $http.post("/MobileTaskCenter/GetTaskInfo", params, config).then((rsp) => {
		return rsp.data
    }),
    //查看熊抢购商品信息
    getSkillTaskInfo: (params, config) => $http.post("/MobileSkill/GetTaskInfo", params, config).then((rsp) => {
		return rsp.data
    }),
    //我要退单(淘抢购退单)
    handleChargeBack: (params, config) => $http.post("/MobileTaskCenter/ChargeBack", params, config).then((rsp) => {
		return rsp.data
    }),
    //我要退单(熊抢购退单)
    handleSkillChargeBack: (params, config) => $http.post("/MobileSkill/SkillChargeBack", params, config).then((rsp) => {
		return rsp.data
    }),
     //查看订单商家备注信息
    getBussinessTaskInfo: (params, config) => $http.post("/MobileTaskCenter/GetBussinessTaskInfo", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询好评截图信息
    getUploadInfo: (params, config) => $http.post("/MobileTaskCenter/GetUploadInfo", params, config).then((rsp) => {
		return rsp.data
    }),
    //保存好评截图信息
    hWUploadScreenShots: (params, config) => $http.post("/api/TDX/HWUploadScreenShots", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询商品售后详情
    getTaskByFID: (params, config) => $http.post("/MobileTaskCenter/GetTaskByFID", params, config).then((rsp) => {
		return rsp.data
    }),
    //订单售后图片上传
    uploadRefundImg: (params, config) => $http.postUpload("/MobileTaskCenter/RefundImg", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询商品所属分类类别
    getCategory: (params, config) => $http.post("/Mobile/GetCategory", params, config).then((rsp) => {
		return rsp.data
    }),
    //查询商品详情
    getProductDetail: (params, config) => $http.post("/Mobile/GetProductDetail", params, config).then((rsp) => {
		return rsp.data
    }),
    //提交淘抢购领取任务
    getTheTask: (params, config) => $http.post("/Mobile/GetTheTask", params, config).then((rsp) => {
		return rsp.data
    }),
    //提交熊抢购领取任务
    getSkillTask: (params, config) => $http.post("/MobileSkill/GetSkillTask", params, config).then((rsp) => {
		return rsp.data
    }),
    //开始任务
    startTask: (params, config) => $http.post("/Mobile/StartTask", params, config).then((rsp) => {
		return rsp.data
    }),
    //商品预定
    reservations: (params, config) => $http.post("/Mobile/Reservations", params, config).then((rsp) => {
		return rsp.data
    }),
    //验证淘抢购商品链接或者淘口令是否正确
    checkGoodsUrl: (params, config) => $http.post("/MobileTaskCenter/CheckGoodsUrl", params, config).then((rsp) => {
		return rsp.data
    }),
    //验证熊抢购商品链接或者淘口令是否正确
    checkSkillGoodsUrl: (params, config) => $http.post("/MobileSkill/SkillCheckGoodsUrl", params, config).then((rsp) => {
		return rsp.data
    }),
    
    //完成淘抢购任务
    complateTask: (params, config) => $http.post("/MobileTaskCenter/ComplateTask", params, config).then((rsp) => {
		return rsp.data
    }),
    //完成熊抢购任务
    complateSkillTask: (params, config) => $http.post("/MobileSkill/SkillComplateTask", params, config).then((rsp) => {
		return rsp.data
    }),
    //举报订单(提交)
    addOrderReport: (params, config) => $http.post("/MobileTaskCenter/AddOrderReport", params, config).then((rsp) => {
		return rsp.data
    }),
    //熊抢购商品详情
    getSkillTaskDetail: (params, config) => $http.post("MobileSkill/GetSkillTaskDetail", params, config).then((rsp) => {
		return rsp.data
    }),
    
}    