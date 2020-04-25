export const routes = [{
		path: '/',
		name: 'login',
		component: () => import('../views/login/login.vue'),
		meta: {
			title: '登录'
		}
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/login/login.vue'),
		meta: {
			title: '登录'
		}
	},
	{
		path: '/register',
		name: 'register',
		component: () => import('../views/login/register.vue'),
		meta: {
			title: '注册'
		}
	},
	{
		path: '/forgetPwd',
		name: 'forgetPwd',
		component: () => import('../views/login/forgetPwd.vue'),
		meta: {
			title: '找回密码'
		}
	},
	/*{
		path: '*',
		redirect: '/404'
	}*/
]