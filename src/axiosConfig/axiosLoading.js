import {Toast} from 'vant'

let needLoadingRequestCount = 0,
    toastInstance = null;

export function showFullScreenLoading() {
    return new Promise((resolve) => { // resolve, reject
        if (needLoadingRequestCount === 0) {
            toastInstance = Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0
            });
        }
        needLoadingRequestCount++
        resolve()
    })
}

export function tryHideFullScreenLoading() {
    return new Promise((resolve) => {   // resolve, reject
        if (needLoadingRequestCount <= 0) {
            resolve()	//resolve会终止promise但后面的js代码任然会执行
        } else {
            needLoadingRequestCount--
            if (needLoadingRequestCount === 0) {
                toastInstance.clear();
            }
            resolve()
        }
    })
}
