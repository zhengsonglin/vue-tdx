import $http from '@/axiosConfig/axios.init'

export default {
  // 发送短信验证码
    sendCode: (params: any, config: any) => $http.post('/Mobile/SendMessage', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 用户注册
    register: (params: any, config: any) => $http.post('/Mobile/RegisterCheck', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 用户登录
    login: (params: any, config: any) => $http.postByQS('/sys/login', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 获取CheckKDJ
    checkKDJ: (params: any, config: any) => $http.post('/Mobile/CheckKDJ', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 找回密码(发验证码)
    getBackPwd: (params: any, config: any) => $http.post('/Mobile/GetBackPwd', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 编辑密码
    editPwd: (params: any, config: any) => $http.post('/Mobile/EditPwd', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 获取首页淘抢购商品列表
    getProductList: (params: any, config: any) => $http.post('/pa/index', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 获取首页熊抢购商品列表
    getSkillTaskList: (params: any, config: any) => $http.post('/pa/index', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 获取同类型单个商品列表(同一个商品数量有多个)
    getSingleProductList: (params: any, config: any) => $http.post('/pa/detail', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 获取用户信息
    getIndexInfo: (params: any, config: any) => $http.post('/u/index', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 获取用户定制金返款记录
    getUserRefound: (params: any, config: any) => $http.post('/MobileUserCenter/GetMobileUserRefound', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 获取用户已预定商品
    getUserReserve: (params: any, config: any) => $http.post('/MobileUserCenter/Getreserve', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 获取用户预定商品记录
    getUserReserveRecord: (params: any, config: any) => $http.post('/MobileUserCenter/GetreserveRecord', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 删除预定商品明细记录
    deleteUserReserve: (params: any, config: any) => $http.post('/MobileUserCenter/DeleteReserve', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 获取用户实名认证信息
    getLoginUserInfo: (params: any, config: any) => $http.get('/u/prove', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 强制修改用户认证信息(违规操作，请勿尝试)
    updateUserAuthentica: (params: any, config: any) => $http.postByQS('/api/TDX/ReallyNameAudit', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 获取用户信息(银行卡)
    getUserInfo: (params: any, config: any) => $http.get('/u/bank', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 获取地区支行信息
    getSubBranch: (params: any, config: any) => $http.post('/MobileUserCenter/GetSubBranch', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 用户中心修改银行卡发送验证码
    sendShotMsg: (params: any, config: any) => $http.post('/MobileUserCenter/SendShotMsg', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 用户中心绑定银行卡信息
    bindCardInfo: (params: any, config: any) => $http.post('/MobileUserCenter/BindCardInfo', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 财务中心交易明细
    getPutForwardRecord: (params: any, config: any) => $http.post('/u/transactiondetail', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 查询账户提现信息
    getWithDrawCashInfo: (params: any, config: any) => $http.get('/u/withdraw', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 申请账户提现
    handleWithDrawCash: (params: any, config: any) => $http.post('/u/withdraw', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 获取用户个人基本信息
    getBaseUserInfo: (params: any, config: any) => $http.get('/u/info', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 设置用户个人基本信息
    setBaseUserInfo: (params: any, config: any) => $http.post('/u/info', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 修改登录密码
    updatePwd: (params: any, config: any) => $http.post('/sys/modifypwd', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 获取反馈内容列表
    getFeedBackList: (params: any, config: any) => $http.post('/MobileUserCenter/GetFeedBack', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 添加反馈内容
    addFeedBack: (params: any, config: any) => $http.post('/MobileUserCenter/AddFeedBack', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 查询单条反馈意见信息
    getFeedBackDetail: (params: any, config: any) => $http.post('/MobileUserCenter/GetFeedBackDetail', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 获取系统更新内容
    getSysInfo: (params: any, config: any) => $http.post('/MobileUserCenter/GetSysInfo', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 获取淘抢购订单列表（任务列表）
    getTaskOrderList: (params: any, config: any) => $http.post('/o/orderlist', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 获取熊抢购订单列表（任务列表）
    getSkillTaskOrderList: (params: any, config: any) => $http.post('/MobileSkill/GetTaskList', params, config).then((rsp: any) => {
    return rsp.data
    }),
    
    // 查看售后订单列表(包含用户发起和商家发起)
    getTaskSaleList: (params: any, config: any) => $http.post('/MobileTaskCenter/GetTaskSale', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 查看淘抢购商品信息
    getTaskInfo: (params: any, config: any) => $http.post('/o/detail', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 查看熊抢购商品信息
    getSkillTaskInfo: (params: any, config: any) => $http.post('/MobileSkill/GetTaskInfo', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 我要退单(淘抢购退单)
    handleChargeBack: (params: any, config: any) => $http.post('/MobileTaskCenter/ChargeBack', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 我要退单(熊抢购退单)
    handleSkillChargeBack: (params: any, config: any) => $http.post('/MobileSkill/SkillChargeBack', params, config).then((rsp: any) => {
    return rsp.data
    }),
     // 查看订单商家备注信息
    getBussinessTaskInfo: (params: any, config: any) => $http.post('/o/orderaction', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 查询好评截图信息
    getUploadInfo: (params: any, config: any) => $http.post('/o/orderaction', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 保存好评截图信息
    hWUploadScreenShots: (params: any, config: any) => $http.post('/api/TDX/HWUploadScreenShots', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 查询商品售后详情
    getTaskByFID: (params: any, config: any) => $http.post('/MobileTaskCenter/GetTaskByFID', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 订单售后图片上传
    uploadRefundImg: (params: any, config: any) => $http.postUpload('/MobileTaskCenter/RefundImg', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 查询商品所属分类类别
    getCategory: (params: any, config: any) => $http.get('/pa/cate', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 查询商品详情
    getProductDetail: (params: any, config: any) => $http.post('/t/detail', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 提交淘抢购领取任务
    getTheTask: (params: any, config: any) => $http.post('/t/receive', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 提交熊抢购领取任务
    getSkillTask: (params: any, config: any) => $http.post('/MobileSkill/GetSkillTask', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 开始任务
    startTask: (params: any, config: any) => $http.post('/Mobile/StartTask', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 商品预定
    reservations: (params: any, config: any) => $http.post('/Mobile/Reservations', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 验证淘抢购商品链接或者淘口令是否正确
    checkGoodsUrl: (params: any, config: any) => $http.post('/o/Urlcheck', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 验证熊抢购商品链接或者淘口令是否正确
    checkSkillGoodsUrl: (params: any, config: any) => $http.post('/MobileSkill/SkillCheckGoodsUrl', params, config).then((rsp: any) => {
    return rsp.data
    }),
    
    // 完成淘抢购任务
    complateTask: (params: any, config: any) => $http.post('/MobileTaskCenter/ComplateTask', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 完成熊抢购任务
    complateSkillTask: (params: any, config: any) => $http.post('/MobileSkill/SkillComplateTask', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 举报订单(提交)
    addOrderReport: (params: any, config: any) => $http.post('/MobileTaskCenter/AddOrderReport', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 熊抢购商品详情
    getSkillTaskDetail: (params: any, config: any) => $http.post('MobileSkill/GetSkillTaskDetail', params, config).then((rsp: any) => {
    return rsp.data
    }),
    // 提交测试图片反馈
    uploadTestPicture: (params: any, config: any) => $http.postUpload('/web/AddRecode', params, config).then((rsp: any) => {
    return rsp.data
    }),
    
    
}    
