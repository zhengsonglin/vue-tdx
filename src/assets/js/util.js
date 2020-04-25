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