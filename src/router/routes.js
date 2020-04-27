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
		path: '/',
		name: 'homeIndex',
		component: () =>
			import('../views/index.vue'),
		children: [{
				path: '/home',
				component: () =>
					import('../views/home/index.vue'),
				meta: {
					title: '首页'
				},
			},
			{
				path: '/question',
				component: () =>
					import('../views/question/index.vue'),
				meta: {
					title: '问题集'
				},
			},
			{
				path: '/taskCenter',
				component: () =>
					import('../views/taskCenter/index.vue'),
				meta: {
					title: '任务中心'
				},
			},
			{
				path: '/userCenter',
				component: () =>
					import('../views/userCenter/index.vue'),
				meta: {
					title: '会员中心'
				},
			}  
		]
	},
	/*{
		path: '*',
		redirect: '/404'
	}*/
]