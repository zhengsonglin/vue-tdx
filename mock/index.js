/*
import Mock from 'mockjs'
import qs from 'qs'
import user from './user'
import order from './order'
import home from './home'
import setting from './setting'
*/

// import store from '@/store'

const Mock = require('mockjs')
const qs = require('qs')
const user = require('./user')
const order = require('./order')
const home = require('./home')
const setting = require('./setting')

//const { param2Obj } = require('./utils')

const mocks = [
    ...user,
    ...order,
    ...home,
    ...setting
]


// for front mock （拦截请求，真正的请求并未发生出去）
// please use it cautiously, it will redefine XMLHttpRequest, （请谨慎使用，他将重新定义 XMLHttpRequest请求）
// which will cause many of your third-party libraries to be invalidated(like progress event). （他将导致很多第三方库无效，如请求进度事件）
function mockXHR() {
    // mock patch
    // https://github.com/nuysoft/Mock/issues/300
    Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
    Mock.XHR.prototype.send = function() {
        if (this.custom.xhr) {
            this.custom.xhr.withCredentials = this.withCredentials || false

            if (this.responseType) {
                this.custom.xhr.responseType = this.responseType
            }
        }
        this.proxy_send(...arguments)
    }

    function XHR2ExpressReqWrap(respond) {
        return function(options) {
            let result = null
            if (respond instanceof Function) {
                const { body, type, url } = options
                // https://expressjs.com/en/4x/api.html#req
                result = respond({
                    method: type,
                    body: JSON.parse(body),
                    query: qs.parse(url) // param2Obj(url)
                })
            } else {
                result = respond
            }
            console.log(result)
            return Mock.mock(result)
        }
    }

    for (const i of mocks) {
        console.log(i.url)
        Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
    }
}
/*
export default {
    mocks,
    mockXHR
}
*/

module.exports = {
    mocks,
    mockXHR
}
