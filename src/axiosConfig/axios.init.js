import axios from 'axios'
import qs from 'qs'

import { showFullScreenLoading, tryHideFullScreenLoading } from './axiosLoading'
import { Toast } from 'vant'
import store from '../store'
import router from '../router'

// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
//axios.defaults.baseURL = "/api"//process.env.baseURL;
//console.log(process.env)
// 创建axios实例
const $ = axios.create({
	timeout: 600000,
	baseURL: process.env.NODE_ENV === 'production' ? '/api' : '/api', // api的API_ROOT
	headers: {
		'Content-Type': 'application/json',
		//"token": 'XXXX'		//如果不需要token， headers一定不能多传参数
	}

})

// 请求拦截器
$.interceptors.request.use((config) => { //config 无法注入axios内置config之外的参数， 所以自定义config.showLoading 是无法接受的
	//console.log(config);
	let { token } = store.state
	let { projectCode } = store.getters
	
	if (token) {
		config.headers['X-Token'] = token //getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
	}
	
	if(projectCode){
		if(config.method == "post" && !config.data.projectCode){
	      config.data.projectCode = projectCode;
	    }else if(config.method == "get" && !config.params.projectCode){
	      config.params.projectCode = projectCode;
	    }
    }
	return config
}, (error) => {
	return Promise.reject(error)
})

// 响应拦截器
$.interceptors.response.use((response) => {
	handleLoading(false).then(()=>{
		if(response.status ==200){
			if(response.data.error.errno && response.data.error.errno != "200"){
				//Message.error(response.data.errorMsg);
				Toast.fail(response.data.Content);
			}
		}else{
			Toast.fail(response.statusText);
			//router.push("/login")
		}
	})
	return response
}, (error) => {
	handleLoading(false)
	
	if (error && error.response && error.response.status) {
		console.log(error.response)
		switch (error.response.status) {
			case 404:
				//Toast.fail('网络请求不存在');
				Toast({
					type:"fail",
					duration: 500, // 0持续展示 toast
				  	forbidClick: true,
				  	message: '网络请求不存在',
				  	onClose: ()=>{
				  		router.push("/login")
				  	}
				})
				break;
			default:
				Toast.fail(error.response.data.message || "服务器异常");
		}
		return Promise.reject(error.response)
	}
})

const defaultConfig = {
	showLoading:true
}

function handleLoading(showLoading){
	return new Promise((resolve, reject)=>{
		if (showLoading) {
			showFullScreenLoading().then(resolve)
		}else{
			tryHideFullScreenLoading().then(resolve)
		}
	})
}

export default {
	get: (url, data={}, config={}) =>{
		let mergeConfig = {...defaultConfig, ...config};
		handleLoading(mergeConfig.showLoading);
		
		return new Promise((resolve, reject)=>{
			$.get(url, {params: data, ...mergeConfig} ).then(res=>{
				resolve(res)
			}).catch(err=>{
				//console.log(err);
				reject(err)
			})
		})
	},
	post: (url, data={}, config={}) => {
		let mergeConfig = {...defaultConfig, ...config};
		handleLoading(mergeConfig.showLoading);
		
		return new Promise((resolve, reject)=>{
			$.post(url, data, { ...mergeConfig}).then(res=>{
				resolve(res)
			}).catch(err=>{
				reject(err)
			})
		})
	},
	delete: (url, data={}, config={}) => {
		let mergeConfig = {...defaultConfig, ...config};
		handleLoading(mergeConfig.showLoading);
		
		return new Promise((resolve, reject)=>{
			$.delete(url, {data}, { ...mergeConfig}).then(res=>{
				resolve(res)
			}).catch(err=>{
				reject(err)
			})
		})
	},
	/*delete: (url, data={}, config={}) => {
		let mergeConfig = {...defaultConfig, ...config};
		handleLoading(mergeConfig.showLoading);

		return $.delete(url, {data})
	},*/
	postByQS: (url, data={}, config={}) => {
		config.headers = {
			 'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
		}
		let mergeConfig = {...defaultConfig, ...config};
		handleLoading(mergeConfig.showLoading);
		return new Promise((resolve, reject)=>{
			$.post(url, qs.stringify(data), { ...mergeConfig }).then(res=>{
				resolve(res)
			}).catch(err=>{
				reject(err)
			})
		})
	},
	postUpload: (url, data={}, config={}) => {
		config.headers = {
			 'Content-Type':'multipart/form-data'
		}
		let mergeConfig = {...defaultConfig, ...config};
		handleLoading(mergeConfig.showLoading);
		
		let param = new FormData()  // 创建form对象
		Object.keys(data).forEach((key)=>{
			param.append(key, data[key])  
		})
      	//param.append('file', data.file)  // 通过append向form对象添加数据
      	//param.append('age', '18') // 添加form表单中其他数据
     
		return new Promise((resolve, reject)=>{
			$.post(url, param, { ...mergeConfig }).then(res=>{
				resolve(res)
			}).catch(err=>{
				reject(err)
			})
		})
	}
}
