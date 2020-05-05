<template>
	<div class="page-index bg-fff h100 over-auto changePwd">
		<div class="header-wrap">
			<van-nav-bar title="修改密码" left-text="" right-text="" left-arrow fixed z-index="10" class="header" @click-left="onClickLeft" />
		</div>
		<div class="content">
			<div class="container_title text-c">修改登录密码<i class="iconfont icon-icon-dsj"></i></div>
			<van-cell-group class="form-group">
				<van-field v-model="form.oldpwd" placeholder="请输入原始密码" label="原始密码" />
				<van-field v-model="form.newpwd" placeholder="请输入新登录密码" label="新登录密码"/>
				<van-field v-model="form.confirmpwd" placeholder="请再次确认密码" label="确认密码"/>
			</van-cell-group>
			<div class="btn-group">	
				<van-button block round color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="submit" >提交</van-button>
			</div>
		</div>
	</div>	
</template>

<script>
	import utils from "@/utils/utils"
	export default {
		name: 'changePwd',
		data() {
			return {
				form:{}
			}
		},
		methods: {
			onClickLeft() {
				this.$router.back();
			},
			submit(){
				let {oldpwd, newpwd, confirmpwd} = this.form;
				if(utils.isEmpty(oldpwd)){
					this.$toast('请输入原始密码');
				}else if(utils.isEmpty(newpwd)){
					this.$toast('请输入新登录密码');
				}else if(utils.isEmpty(confirmpwd)){
					this.$toast('请确认新登录密码');
				}else if(newpwd != confirmpwd){
					this.$toast('两次密码输入不一致');
				}else{
					//console.log(this.form)
					
					this.API.updatePwd().then((data)=>{
						if (data.ErrorCode == 100) {
							this.$toast({
	                        	duration: 600, // 持续展示 toast
							  	forbidClick: true,
							  	type: "success",
							  	message: '修改成功！请重新登录',
							  	onClose:()=>{this.$router.push("login")}
							});
							
	                    } else if (data.ErrorCode == 101) {
	                    	this.$toast({
							  	//forbidClick: true,
							  	type: "fail",
							  	message: data.Content
							});
	                    } else {
	                        this.$router.push("login")
	                    }
	
					})
				}
			}
		}
	}
</script>


<style scoped lang="scss">
	.page-index {
		.header {
			background: #EE580F;
			font-size: 17px;
			/deep/ .van-icon,
			/deep/ .van-nav-bar__title {
				color: #fff;
			}
		}
		.content {
			margin-top: 46px;
			.container_title {
			    height: 46px;
			    line-height: 46px;
			    border-bottom: 1px solid #fd3c3c;
			    position: relative;
			    color: #fd3c3c;
			    font-size: 14px;
			    i {
				    position: absolute;
				    bottom: -18px;
				    right: 0;
    				left: 0;
				    color: #fd3c3c;
				    font-size: 30px;
				    width: 34px;
    				margin: 0 auto;
				}
			}
			.form-group{
				margin-top: 20px;
			}
			.btn-group{
				margin: 30px 10px 0;
			}
		}
	}
</style>