<template>
	<div class="page-login h100">
		<div class="header c-fff text-c">
			<p>登录</p>
		</div>
		<div class="content">
			<div class="login-pic text-c">
				<img src="img/logo.png" width="56%" />
			</div>
			<div class="login-form">
				<div class="login-input text-input">
					<input type="text" id="user" v-model="form.user" placeholder="请输入账号">
				</div>
				<div class="login-input pass-input">
					<input type="password" id="pwd" v-model="form.pwd" placeholder="请输入密码">
				</div>
				<div class="other">
					<span class="register fl" @click="toRegister">注册</span>
					<span class="forget fr" @click="forgetPass">忘记密码</span>
				</div>
				<div class="btn-grop c-fff text-c" @click="handleLogin">
					<span class="btn">登录</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { State, Getter, Mutation, Action } from 'vuex-class'
	import { checkMobilePhone } from '@/assets/js/util';
	import storage from 'good-storage';
	//import { Button, Icon  } from 'vant';
	
	@Component({
		name: 'login',
		beforeRouteLeave(to: any, from: any, next: any) {
	      console.log('beforeRouteLeave');
	      next();
	    },
	    beforeRouteEnter(to: any, from: any, next: any) {
	      console.log('beforeRouteLeave');
	      next();
	    },
		// 生命周期, 也可以写在下面的组件方法中，组件中的生命周期方法会覆盖当前的生命周期方法
		mounted() {
			console.log("mounted login2")
		}
	})
	export default class Login extends Vue {
		@Mutation('setUserLoginInfo') setUserLoginInfo: any
		
		private form: any = {
			user: "18598271043",
			pwd: "zsl123456",
			platform: "2c"
		}
		
		private toRegister() : void{
			console.log("register")
			this.$router.push("register")
		}
		private forgetPass() : void{
			this.$router.push("forgetPwd")
		}
		private handleLogin() : void{
			//console.log('handleLogin', checkMobilePhone, "---")
			let {
				user,
				pwd
			} = this.form
			if(!checkMobilePhone(user)) {
				this.$toast('请输入正确手机号');
			} else if(pwd == "") {
				this.$toast('请输入密码');
			} else {
				this.hasCommit = true
				this.API.login(this.form).then((result: any) => {
					let {data, error} = result
					console.log(data)
					if(error.errno == 200) {
						//this.loginSuccess(data)
						storage.set("tdx-Token", "faketoken");
						this.setUserLoginInfo(data)
						this.$router.push("home")
					} else {
						this.hasCommit = false
						this.$toast.fail(error.usermsg)
					}
				})
			}
		}

	}
</script>

<style scoped lang="scss">
	input[type=text],
	input[type=password] {
		height: 40px;
		line-height: 20px;
		border-radius: 3px;
		outline: 0;
		background-color: #fff;
		-webkit-appearance: none;
	}
	.page-login {
		background: #fff;
		.header {
			background: #EE580F;
			height: 45px;
			line-height: 45px;
			font-size: 17px;
		}
		.content {
			.login-pic {
				img {
					margin: 60px auto 40px;
				}
			}
			.login-form {
				.login-input {
					width: 80%;
					margin: 0 auto 20px;
					input {
						width: 100%;
						display: block;
						margin: auto;
						border: 1px solid #ccc;
						text-indent: 15px;
					}
				}
				.other {
					width: 80%;
					margin: 0 auto 20px;
					overflow: auto;
					.register {}
					.forget {}
				}
				.btn-grop {
					width: 80%;
					margin: 0 auto;
					background: #EE580F;
					height: 40px;
					line-height: 40px;
					border-radius: 6px;
				}
			}
		}
	}
</style>