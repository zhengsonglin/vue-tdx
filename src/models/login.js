//import storage from 'good-storage';
import { register, login, sendCode, sendCodeForget, resetPwd } from '../services/api';
import { delay } from '../utils/utils'
export const NS = 'login';

function handResponse(response, callback) {
	if (response.code === 200) {
		if (callback && typeof callback === 'function') {
			callback(response); // 返回结果
		}
	}
}

   
export default {
	namespace: NS,
	state: {
		testInfo: {
			age: 18,
			name: '张三'
		}
	},

	subscriptions: {
		setup({ dispatch, history }) {
			// eslint-disable-line
		}
	},

	effects: {
		*fetch({ payload }, { call, put, select }) {
			// eslint-disable-line
			//const state = yield select(state => state[NS]);
			yield put({ type: 'save' });
		},
		// 注册
		*doRegister({ payload, callback }, { call, put }) {
			const response = yield call(register, payload);
			//yield put({ type: 'save' });
			handResponse(response, callback);
		},

		// 登录
		*doLogin({ payload }, { call, put }) {
			const response = yield call(login, payload);
            yield call(delay, 1000);    //模拟延迟加载1s
			const { error, data } = response;

			if (error.errno === 200) {
				yield put({ type: 'global/setUserLoginInfo', payload: { ...data } });
			}
			return response;
		},
		// 发送注册短信验证码
		*doSendCode({ payload, callback }, { call, put }) {
			const response = yield call(sendCode, payload);
			//yield put({ type: 'save' });
			if (callback) callback(response);
		},
		// 发送找回密码短信验证码
		*doSendCodeForget({ payload, callback }, { call, put }) {
			const response = yield call(sendCodeForget, payload);
			//yield put({ type: 'save' });
			if (callback) callback(response);
		},
		// 重置登录密码
		*doResetPwd({ payload, callback }, { call, put }) {
			const response = yield call(resetPwd, payload);
			//yield put({ type: 'save' });
			if (callback) callback(response);
		}
	},

	reducers: {
		save(state, action) {
			return { ...state, ...action.payload };
		}
	}
};
