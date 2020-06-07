export const routes = [{
		path: '/',
		name: 'login',
		component: () =>
			import('../views/login/login.vue'),
		meta: {
			title: '登录'
		}
	},
	{
		path: '/Mobile/MobileLogin',
		redirect: "login"
	},
	{
		path: '/login',
		name: 'login',
		component: () =>
			import('../views/login/login.vue'),
		meta: {
			title: '登录'
		}
	},
	{
		path: '/register',
		name: 'register',
		component: () =>
			import('../views/login/register.vue'),
		meta: {
			title: '注册'
		}
	},
	{
		path: '/forgetPwd',
		name: 'forgetPwd',
		component: () =>
			import('../views/login/forgetPwd.vue'),
		meta: {
			title: '找回密码'
		}
	},
	{
		path: '/home',
		name: 'home',
		component: () =>
			import('../views/index.vue'),
		meta: {
			//keepAlive: true
		},
		children: [{
				path: '',
				component: () =>
					import('../views/home/index.vue'),
				meta: {
					title: '首页',
					//keepAlive: true
				},
				children: [/*{
						path: '/sortProduct',
						name: "sortProduct",
						component: () =>
							import('../views/home/sortProduct.vue'),
						meta: {
							title: '商品分类',
						},
					},*/
					/*{
						path: '/skillTaskList',
						name: "skillTaskList",
						component: () =>
							import('../views/home/skillTaskList.vue'),
						meta: {
							title: '熊抢购',
						},
					}*/
					
				]
			},
			{
				path: '/sortProduct',
				name: "sortProduct",
				component: () =>
					import('../views/home/sortProduct.vue'),
				meta: {
					title: '商品分类',
				},
			},
			{
				path: '/question',
				name: "question",
				component: () =>
					import('../views/question/index.vue'),
				meta: {
					title: '问题集',
					//keepAlive: true
				},
			},
			{
				path: '/taskCenter',
				name: "taskCenter",
				component: () =>
					import('../views/taskCenter/index.vue'),
				meta: {
					title: '任务中心',
					//keepAlive: true
				},
			},
			{
				path: '/userCenter',
				name: "userCenter",
				component: () =>
					import('../views/userCenter/index.vue'),
				meta: {
					title: '会员中心',
					//keepAlive: true
				},
			},
			{
				path: '/refundRecord',
				name: "refundRecord",
				component: () =>
					import('../views/userCenter/refundRecord.vue'),
				meta: {
					title: '返款记录'
				},
			}
		]
	},
	{
		path: '/pictureTest1',
		name: "pictureTest1",
		component: () =>
			import('../views/question/pictureTest1.vue'),
		meta: {
			title: '图片测试',
			//keepAlive: true
		},
	},
	{
		path: '/pictureTest2',
		name: "pictureTest2",
		component: () =>
			import('../views/question/pictureTest2.vue'),
		meta: {
			title: '图片测试',
			//keepAlive: true
		},
	},
	{
		path: '/recommendFriend',
		name: "recommendFriend",
		component: () =>
			import('../views/userCenter/recommendFriend.vue'),
		meta: {
			title: '推荐好友'
		},
	},
	{
		path: '/reservationRecord',
		name: "reservationRecord",
		component: () =>
			import('../views/userCenter/reservationRecord.vue'),
		meta: {
			title: '预定任务明细'
		},
	},
	{
		path: '/realNameAuthentica',
		name: "realNameAuthentica",
		component: () =>
			import('../views/userCenter/realNameAuthentica.vue'),
		meta: {
			title: '实名认证'
		},
	},
	{
		path: '/cardBind',
		name: "cardBind",
		component: () =>
			import('../views/userCenter/cardBind.vue'),
		meta: {
			title: '绑定银行卡'
		},
	},
	{
		path: '/financeCenter',
		name: "financeCenter",
		component: () =>
			import('../views/userCenter/financeCenter.vue'),
		meta: {
			title: '财务中心'
		},
	},
	{
		path: '/withDrawCash',
		name: "withDrawCash",
		component: () =>
			import('../views/userCenter/withDrawCash.vue'),
		meta: {
			title: '账户提现'
		},
	},
	{
		path: '/baseUserInfo',
		name: "baseUserInfo",
		component: () =>
			import('../views/userCenter/baseUserInfo.vue'),
		meta: {
			title: '个人基本资料'
		},
	},
	{
		path: '/newUserStrategy',
		name: "newUserStrategy",
		component: () =>
			import('../views/userCenter/newUserStrategy.vue'),
		meta: {
			title: '新手攻略'
		},
	},
	{
		path: '/touSu',
		name: "touSu",
		component: () =>
			import('../views/userCenter/touSu.vue'),
		meta: {
			title: '投诉与建议'
		},
	},
	{
		path: '/changePwd',
		name: "changePwd",
		component: () =>
			import('../views/userCenter/changePwd.vue'),
		meta: {
			title: '修改密码'
		},
	},
	{
		path: '/feedBack',
		name: "feedBack",
		component: () =>
			import('../views/userCenter/feedBack.vue'),
		meta: {
			title: '意见反馈',
			keepAlive: true
		},
	},
	{
		path: '/addFeedBack',
		name: "addFeedBack",
		component: () =>
			import('../views/userCenter/addFeedBack.vue'),
		meta: {
			title: '添加意见'
		},
	},
	{
		path: '/updateDescription',
		name: "updateDescription",
		component: () =>
			import('../views/userCenter/updateDescription.vue'),
		meta: {
			title: '更新通知'
		},
	},
	{
		path: '/uploadScreenShot',
		name: "uploadScreenShot",
		component: () =>
			import('../views/taskCenter/uploadScreenShot.vue'),
		meta: {
			title: '好评截图'
		},
	},
	{
		path: '/refundDetial',
		name: "refundDetial",
		component: () =>
			import('../views/taskCenter/refundDetial.vue'),
		meta: {
			title: '申请售后'
		},
	},
	{
		path: '/strategy',
		name: "strategy",
		component: () =>
			import('../views/userCenter/strategy.vue'),
		meta: {
			title: '定制评价攻略'
		},
	},
	{
		path: '/saleAfterStrategy',
		name: "saleAfterStrategy",
		component: () =>
			import('../views/userCenter/saleAfterStrategy.vue'),
		meta: {
			title: '售后攻略'
		},
	},
	{
		path: '/productDetail',	//淘抢购商品详情
		name: "productDetail",
		component: () =>
			import('../views/home/productDetail.vue'),
		meta: {
			title: '商品详情'
		},
	},
	{
		path: '/skillTaskDetail',	//熊抢购商品详情
		name: "skillTaskDetail",
		component: () =>
			import('../views/home/skillTaskDetail.vue'),
		meta: {
			title: '商品详情'
		},
	},
	{
		path: '/startTask',
		name: "startTask",
		component: () =>
			import('../views/home/startTask.vue'),
		meta: {
			title: '开始淘抢购任务'
		},
	},
	{
		path: '/startSkillTask',
		name: "startSkillTask",
		component: () =>
			import('../views/home/startSkillTask.vue'),
		meta: {
			title: '开始熊抢购任务'
		},
	},

	/*{
		path: '*',
		redirect: '/404'
	}*/
]