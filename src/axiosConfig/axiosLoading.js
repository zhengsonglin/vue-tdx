import { Message, Loading } from 'element-ui'

let needLoadingRequestCount = 0,
		loadingInstance = null;

export function showFullScreenLoading() {
	return new Promise((resolve, reject)=>{
		if (needLoadingRequestCount === 0) {
			loadingInstance = Loading.service({
			   lock: true,
			   text: '数据加载中，请稍后...',
			   spinner: 'el-icon-loading',
			   background: 'rgba(0, 0, 0, 0.7)'
			})
		}
		needLoadingRequestCount++
		resolve()
	})
}

export function tryHideFullScreenLoading() {
	return new Promise((resolve, reject)=>{
		if (needLoadingRequestCount <= 0){
			resolve()	//resolve会终止promise但后面的js代码任然会执行
		}else{
			needLoadingRequestCount--
			if (needLoadingRequestCount === 0) {
				loadingInstance.close();
			}
			resolve()
		}
	})
}
