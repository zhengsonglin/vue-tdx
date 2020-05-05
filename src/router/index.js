import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'
import store from '../store'
import utils from '../utils/utils'
Vue.use(VueRouter)

//解决 在使用Element UI 时点击同一个路由，控制台报错，但不影响使用的bug
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};


const router =  new VueRouter({
	routes,
	mode: 'history',//history, 默认hash
	scrollBehavior:(to, from, savedPosition) => {
		//console.log(savedPosition);
		if (savedPosition && to.meta.keepAlive) {
		   return savedPosition;
		}
		if (to.hash) {	//模拟『滚动到锚点』的行为：
			return {
			  selector: to.hash
			}
		}
		return { x: 0, y:0 };
	},
})

/*
router.beforeEach((to, from, next)=>{
	let { userInfo } = store.state
	
	if (to.matched.length ===0) {                                        //如果未匹配到路由
		//from.name ? next({ name:from.name }) : next('/login');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
		next('/login'); 
	}else {
		if(to.path == '/login'){
			if(utils.isEmpty(userInfo)){
				next(); 
			}else{
				next('/projectList')          
			}
		}else{
			if(utils.isEmpty(userInfo)){
				next('/login')
			}else{
				next(); 
			}
		}
	}
})*/

router.afterEach((to,from)=>{
	if(to.meta && to.meta.title){
		document.title = to.meta.title
	}
	//console.log(to)
}) 

export default router

