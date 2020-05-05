export default {
    //获取url参数(Object)
    getUrlkey(url) {
        var params = {};
        if(url.indexOf("?") !=-1){
            var urls = url.split("?");                 
            var arr = urls[1].split("&");              
            for (var i = 0, l = arr.length; i < l; i++) {
                var a = arr[i].split("=");               
                params[a[0]] = a[1];                     
            } 
        }                                          
        return params;
    },
    //数组对象深拷贝,JSON.stringfy()和JSON.parse()可解决大部分拷贝，但当值为undefined、function、symbol 会在转换过程中被忽略
    deepCopy(obj) {
        var result = Array.isArray(obj) ? [] : {};
        for (var key in obj) {		//for in 会遍历数组所有的可枚举属性，包括原型上的属性和方法
          if (obj.hasOwnProperty(key)) {	//hasOwnProperty过滤原型上的属性和方法
            if (typeof obj[key] === 'object' && obj[key]!==null) {
              result[key] = this.deepCopy(obj[key]);   //递归复制
            } else {
              result[key] = obj[key];
            }
          }
        }
        return result;
    },
    //验证手机号码	
    isPhone(phone){
        return /^1(3|4|5|7|8)\d{9}$/.test(phone)
    },
    //判断为空（去掉前后空格）
    isEmpty(val){
        if(val ==null || val == undefined || (val+"").replace(/(^\s*)|(\s*$)/g, "").length==0){
            return true
        }
        return false
    },
    //判断不为空
    isNotEmpty(val){
        return !this.isEmpty(val)
    },
    // 判断多个全部非空(多个, 用，隔开) 
    isNotEmptyAll(...params){
        var flag = true;
        for(var k in params){
            flag = flag && this.isNotEmpty(params[k]);
        }
        return flag;
    },
    //判断多个全部为空
    isEmptyAll(...params){
        var flag = true;
        for(var k in params){
            flag = flag && this.isEmpty(params[k]);
        }
        return flag;
    },
    cardPermission(type) {
	    if(type == 1){
	      return "全国"
	    }else if(type==2){
	      return "地区"
	    }else if(type==3){
	      return "省区"
	    }else if(type==4){
	      return "管理区域"
	    }else if(type==5){
	      return "管理城市"
	    }else if(type==6){
	      return "经营城市"
	    }else if(type==7){
	      return "店铺"
	    }else if(type==8){
	      return "品牌"
	    }else if(type==9){
	      return "商品"
	    }else if(type==10){
	      return "商场"
	    }
	},
}