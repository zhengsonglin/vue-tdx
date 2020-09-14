function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr: any[]): any {
  let copyArr = arr.slice()
  for (let i = 0; i < copyArr.length; i++) {
    let j = getRandomInt(0, i)
    let t = copyArr[i]
    copyArr[i] = copyArr[j]
    copyArr[j] = t
  }
  return _arr
}

// 延迟执行function
export function debounce(func: any, delay: number): any {
  let timer: any = null

  return function() {
    const args = arguments;
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      // func.apply(this, args)
      func(...args);
    }, delay)
  }
}

// 手机验证正则表达式
export function checkMobilePhone(phone: string): boolean {
  let myreg: RegExp = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!myreg.test(phone)) {
    return false;
  } else {
    return true;
  }
}

export function getRandomFromArray(arr: any[], len: number, isRepeat: boolean): any[] { // 数组，长度， 是否可重复
  let shuffled: any[] = [...arr].slice(0),
    l: number = shuffled.length,
    result: any[] = []

  for (let n = 0; n < len; n++) {
    if (isRepeat) { // 可重复
      let r: number = Math.floor(Math.random() * l * 10)
      result.push(shuffled[r])
    } else {
      let r: number = Math.max(0, Math.floor(Math.random() * shuffled.length) - 1)
      result.push(shuffled.splice(r, 1)[0])
    }
  }

  return result
}
