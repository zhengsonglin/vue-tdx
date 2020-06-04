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
					<input type="text" id="txt_UserName" v-model="form.txt_UserName" placeholder="请输入账号">
				</div>
				<div class="login-input pass-input">
					<input type="password" id="txt_PassWord" v-model="form.txt_PassWord" placeholder="请输入密码">
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

<script>
	import { checkMobilePhone } from 'assets/js/util.js'
	export default {
		name: 'login',
		data() {
			return {
				form: {
					txt_UserName: "18598271043",
					txt_PassWord: "zsl123456"
				},
				hasCommit: false,
			}
		},
		methods: {
			handleLogin() {
				let {
					txt_UserName,
					txt_PassWord
				} = this.form
				if(!checkMobilePhone(txt_UserName)) {
					this.$toast('请输入正确手机号');
				} else if(txt_PassWord == "") {
					this.$toast('请输入密码');
				} else {
					this.hasCommit = true
					this.API.login(this.form).then((data) => {
						if(data.ErrorCode == 100) {
							this.loginSuccess(data)
						} else {
							this.hasCommit = false
							this.$toast.fail(data.Content)
						}
					})
				}
			},
			loginSuccess(data) {
				let type = "0"
				if(type != "0") {
					this.API.checkKDJ({
						shopid: type
					}).then((data) => {
						if(data.ErrorCode == 100) {
							//location.href = "http://www.taodaxiong.cn/Mobile/ProductDetail?ShopId=0"
							//this.$router.push("home")
						} else {
							this.$router.push("home")
						}
					})

				} else {
					this.$router.push("home")
					this.API.getLoginUserInfo().then((data)=>{
						this.$store.commit("setUserLoginInfo", data)
						this.$router.push("home")
					})
				}

				console.log(data)
			},
			toRegister() {
				this.$router.push("register")
			},
			forgetPass() {
				this.$router.push("forgetPwd")
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