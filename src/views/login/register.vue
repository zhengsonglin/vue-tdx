<template>
	<div class="page-register h100">
		<div class="header c-fff text-c"><p>注册</p></div>
		<div class="content">
			<div class="register-form">
				<div class="login-input text-input"><input type="text" id="txt_UserName" class="input-height" v-model.trim="form.username" placeholder="请输入账号" /></div>
				<div class="login-input pass-input">
					<input type="digit" id="txt_Yzm" class="input-height" v-model.trim="form.yzm" placeholder="请输入验证码" maxlength="6" />
					<div class="reg-get-code">
						<van-button type="warning" @click="sendCode" size="mini" :disabled="validCode.isDisabled">{{ validCode.btnText }}</van-button>
					</div>
				</div>
				<div class="login-input pass-input"><input type="password" id="txt_PassWord" class="input-height" v-model.trim="form.pwd" placeholder="请输入密码" /></div>
				<div class="login-input pass-input">
					<input type="password" id="txt_RePassWord" class="input-height" v-model.trim="form.repwd" placeholder="再次输入登录密码" />
				</div>
				<div class="login-input text-input">
					<input type="text" id="txt_Code" class="input-height" v-model.trim="form.code" placeholder="请输入邀请码（比填）" maxlength="8" />
				</div>
				<div class="other">
					<span class="register fl" @click="toLogin">已有账号</span>
					<!--<span class="forget fr" @click="forgetPass">忘记密码</span>-->
				</div>
				<div class="btn-grop c-fff text-c">
					<van-button type="primary" block @click="handleRegister" :loading="loginBtn.isLoading" :loading-text="loginBtn.loadingText">注册</van-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import { checkMobilePhone } from '@/assets/js/util';
//import { Button } from 'vant';

declare module 'vue/types/vue' {
    interface Vue {
        [key: string]: any,
    }
}

@Component({
  name: 'register',
  components: {	//这里通常是自己写的子组件, 当然也可以是如下vant中的组件
  	//[Button.name]: Button
  }
})
export default class Register extends Vue {
	private form: any = {
		username:"18598271043",
		pwd:"",
		repwd:"",
		yzm:"",
		code:""
	}
	private hasCommit: boolean = false

	private validCode: any = {
		btnText:"获取验证码",
		isDisabled:false
	}

	private loginBtn: any = {
		isLoading: false,
		loadingText: "注册中..."
	}
	
	private handleRegister() : void{
		if(!this.hasCommit){
			let {username, pwd, repwd, yzm, code} = this.form
			if(!checkMobilePhone(username)){
				this.$toast('请输入正确手机号');
			}else if(yzm==""){
				this.$toast('验证码不能为空');
			}else if(pwd.length<6){
				this.$toast('密码长度必须是六位以上');
			}else if(pwd != repwd){
				this.$toast('两次密码输入不相同');
			}else if(code==""){
				this.$toast('邀请码不能为空');
			}else{
				let copyForm = Object.assign({}, this.form);
				delete copyForm.repwd
				this.hasCommit = true
				this.loginBtn.isLoading = true
				this.API.register(copyForm).then((data:any)=>{
					if (data.ErrorCode == 100) {
						this.loginBtn.isLoading = false
						this.$toast("注册成功！");
						this.$router.push("login")
					} else {
						this.$toast.fail(data.Content)
					}

				})
			}
		}

	}
	
	private toLogin() : void{
		this.$router.push("login")
	}
	
	private sendCode() : void{
		if(!checkMobilePhone(this.form.username)){
			this.$toast('请输入正确手机号');
		}else{
			this.validCode.isDisabled = true
			/*this.API.sendCode({ phone: this.form.username, txt: "用户注册", type: 1 }).then((data)=>{
				if (data.ErrorCode == 100) {
					this.resetBtn()
				}
			})*/
			this.resetBtn()
			this.$toast('马上发送验证码');
		}
	}
	
	private resetBtn() : void{
		let nums : number = 60, timer : any;

		this.validCode.btnText = nums + "秒后重新获取";
		timer = setInterval(()=>{
			nums--;
			if (nums > 0) {
				this.validCode.btnText = nums + "秒后重新获取";
			} else {
				clearInterval(timer); //清除js定时器
				this.validCode.isDisabled = false;
				this.validCode.btnText = '获取验证码';
			}

		},1000)
	}
	
}
</script>
<style scoped lang="scss">
input.input-height {
	height: 40px;
	line-height: 20px;
	border-radius: 3px;
	outline: 0;
	background-color: #fff;
	-webkit-appearance: none;
}
.page-register {
	background: #fff;
	.header {
		background: #ee580f;
		height: 45px;
		line-height: 45px;
		font-size: 17px;
	}
	.content {
		.register-form {
			padding: 50px 0;
			.login-input {
				width: 80%;
				margin: 0 auto 20px;
				position: relative;
				input {
					width: 100%;
					display: block;
					margin: auto;
					border: 1px solid #ccc;
					text-indent: 15px;
				}
				.reg-get-code {
					position: absolute;
					right: 6px;
					top: 10px;
					color: #ee580f;
				}
			}
			.other {
				width: 80%;
				margin: 0 auto 20px;
				overflow: auto;
				.register {
				}
				.forget {
				}
			}
			.btn-grop {
				width: 80%;
				margin: 0 auto;
			}
		}
	}
}
</style>
