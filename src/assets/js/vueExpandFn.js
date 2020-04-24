//vue 扩展方法
export default {
  install(Vue, options) {
  	
  	//vue通过 Event Bus 进行组件间通信
  	Vue.prototype.$bus = new Vue()
  	
	//数字转百分比保留n位小数
	Vue.prototype.percent = (point,n) => {   //point数值 n保留几位小数(都为number)
		return Math.round(point * 100 * Math.pow(10,n)) / Math.pow(10,n) + "%";
    }
    
	//数字保留n位小数
	Vue.prototype.decimals = (num,n) => {   //num数值 n保留几位小数(都为number)
		return Math.round(num * Math.pow(10,n)) / Math.pow(10,n);
    }
    
  }		
}