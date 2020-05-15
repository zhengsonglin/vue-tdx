//vue 扩展方法
import API from '@/api/getDatas.js'
var moment = require('moment');
moment.locale('zh-cn');	//设置为中文

export default {
	install(Vue, options) {
		//vue通过 Event Bus 进行组件间通信
		Vue.prototype.$bus = new Vue()

		Vue.prototype.API = API		//使用this.API.test().then()

		Vue.filter('toUpperCase', function(value) {
			return value.toUpperCase();
		});
		//返回除null和undefined之外默认值(0正常返回)
		Vue.filter('parseExcludeZero', function(value, defaultValue) {
			if(value || value==0){
				return value
			}
			return defaultValue;
		});
		Vue.mixin({　　
			methods: {　　　　
				demo: function() {　　　　　　
					alert(1);　　　　
				}　　
			}
		});
	
		Vue.prototype.moment = (formateTime, relativeTime)=>{
			if(formateTime !=null){	//formateTime为'/Date(1586829908893)/'居然能解析
				/*if(typeof formateTime == "string"){
					formateTime.replace("/Date(", "").replace(")/", "")
				}else if(typeof formateTime == "object"){
					
				}*/
				
				if(relativeTime !=null){
					return moment(formateTime, relativeTime)
				}else{
					return moment(formateTime)
				}
			}
			return moment()
		}
		//数字转百分比保留n位小数
		Vue.prototype.percent = (point, n) => { //point数值 n保留几位小数(都为number)
			return Math.round(point * 100 * Math.pow(10, n)) / Math.pow(10, n) + "%";
		}

		//数字保留n位小数
		Vue.prototype.decimals = (num, n) => { //num数值 n保留几位小数(都为number)
			return Math.round(num * Math.pow(10, n)) / Math.pow(10, n);
		}

		//格式化时间
		Vue.prototype.format2 = (val) => {
			if(val != null) {
				var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
				//月份为0-11，所以+1，月份小于10时补个0
				var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				return date.getFullYear() + "-" + month + "-" + currentDate;
			}
			return "";
		}

		//金额保留两位小数
		Vue.prototype.toDecimal2 = (x) => {
			var f = parseFloat(x);
			if(isNaN(f)) {
				return "";
			}
			var f = Math.round(x * 100) / 100;
			var s = f.toString();
			var rs = s.indexOf('.');
			if(rs < 0) {
				rs = s.length;
				s += '.';
			}
			while(s.length <= rs + 2) {
				s += '0';
			}
			return s;
		}
	},
}