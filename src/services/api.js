import { stringify } from 'qs';
import request from '../utils/request';
const host = '/api';

export async function test1() {
	return request('/api/project/notice');
}
export async function test2(params) {
    return request(`/api/rule?${stringify(params)}`);
}


//注册 发送短信验证码
export async function sendCode(params) {
	return request(`${host}/Mobile/SendMessage`, {
		method: 'POST',
		body: params
	});
}

//注册
export async function register(params) {
	return request(`${host}/Mobile/RegisterCheck`, {
		method: 'POST',
		body: params
	});
}

//登录
export async function login(params) {
	return request(`${host}/sys/login`, {
		method: 'POST',
		body: params,
		headers : {	//登录接口json和formdata都可以访问
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		}
	});
}

//找回密码 发送短信验证码
export async function sendCodeForget(params) {
	return request(`${host}/Mobile/GetBackPwd`, {
		method: 'POST',
		body: params
	});
}

//重置登录密码
export async function resetPwd(params) {
	return request(`${host}/Mobile/EditPwd`, {
		method: 'POST',
		body: params
	});
}
