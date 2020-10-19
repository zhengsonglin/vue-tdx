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
					<input type="text" id="user" v-model="form.user" placeholder="请输入账号" autocomplete="off">
				</div>
				<div class="login-input pass-input">
					<input type="password" id="pwd" v-model="form.pwd" placeholder="请输入密码" autocomplete="off">
				</div>
				<div class="other">
					<span class="register fl" @click="toRegister">注册</span>
					<span class="forget fr" @click="forgetPass">忘记密码</span>
				</div>
				<div class="btn-grop c-fff text-c" @click="handleLogin('tdx')">
					<span class="btn">大熊登录</span>
				</div>
				<div class="btn-grop c-fff text-c" @click="handleLogin('txx')">
					<span class="btn">小熊登录</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { checkMobilePhone } from 'assets/js/util.js';
	import storage from 'good-storage';
	export default {
		name: 'login',
		data() {
			return {
				form: {
					user: "18598271043",
					pwd: "zsl123456",
					platform: "2c"
				},
				hasCommit: false,
			}
		},
		methods: {
			handleLogin(loginType) {
				this.$store.commit("setLoginType", loginType)
				let { user, pwd } = this.form
				if(!checkMobilePhone(user)) {
					this.$toast('请输入正确手机号');
				} else if(pwd == "") {
					this.$toast('请输入密码');
				} else {
					this.hasCommit = true
					this.API.login(this.form).then(({data, error}) => {
						console.log(data)
						if(error.errno == 200) {
							//this.loginSuccess(data)
							storage.set("tdx-Token", "faketoken");
							this.$store.commit("setUserLoginInfo", data)
							this.$router.push("home")
						} else {
							this.hasCommit = false
							this.$toast.fail(error.usermsg)
						}
					})
				}
			},
			loginSuccess() {
				let type = "0"
				if(type != "0") {
					this.API.checkKDJ({
						shopid: type
					}).then((data) => {
						if(data.ErrorCode == 100) {
							//location.href = "http://www.taodaxiong.cn/Mobile/ProductDetail?ShopId=0"
							this.$router.push("home")
						} else {
							this.$router.push("home")
						}
					})

				} else {
					//this.$router.push("home")
					this.API.getLoginUserInfo().then((data)=>{
						this.$store.commit("setUserLoginInfo", data)
						this.$router.push("home")
					})
				}

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
					margin: 10px auto 20px;
					background: #EE580F;
					height: 40px;
					line-height: 40px;
					border-radius: 6px;
				}
			}
		}
	}
</style>
