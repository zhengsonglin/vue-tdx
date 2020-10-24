export default {
    //获取url参数(Object)
    getUrlkey(url) {
        var params = {};
        if(url.indexOf("?") !==-1){
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
        if(val ===null || val === undefined || (val+"").replace(/(^\s*)|(\s*$)/g, "").length===0){
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
	    if(type === 1){
	      return "全国"
	    }else if(type===2){
	      return "地区"
	    }else if(type===3){
	      return "省区"
	    }else if(type===4){
	      return "管理区域"
	    }else if(type===5){
	      return "管理城市"
	    }else if(type===6){
	      return "经营城市"
	    }else if(type===7){
	      return "店铺"
	    }else if(type===8){
	      return "品牌"
	    }else if(type===9){
	      return "商品"
	    }else if(type===10){
	      return "商场"
	    }
	},
}


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
	let _arr = arr.slice()
	for(let i = 0; i < _arr.length; i++) {
		let j = getRandomInt(0, i)
		let t = _arr[i]
		_arr[i] = _arr[j]
		_arr[j] = t
	}
	return _arr
}

//延迟执行function
export function debounce(func, delay) {
	let timer

	return function(...args) {
		if(timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			func.apply(this, args)
		}, delay)
	}
}

//手机验证正则表达式
export function checkMobilePhone(phone) {
	var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	if(!myreg.test(phone)) {
		return false;
	} else {
		return true;
	}
}

export function getRandomFromArray(arr, len, isRepeat){// 数组，长度， 是否可重复
  let shuffled = [...arr].slice(0), l = shuffled.length, result =[]

  for(let n=0;n<len; n++){

      if(isRepeat){   //可重复
          let r = Math.floor(Math.random(l)*10)
          result.push(shuffled[r])
      }else{
          let r = Math.max(0, Math.floor(Math.random()*shuffled.length) - 1)
          result.push(shuffled.splice(r, 1)[0])
      }
  }

  return result
}

/*延迟执行函数*/
export const delay = (ms) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, ms);
  });