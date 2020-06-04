<template>
	<div class="page-recommend bg-fff h100">
		<div class="header-wrap">
			<van-nav-bar
			  title="推荐好友"
			  left-text=""
			  right-text=""
			  left-arrow
			  class="header"
			  @click-left="onClickLeft"
			/>
		</div>
		<div class="content">
			<div class="title">1、复制链接分享给好友或朋友圈</div>
			<div class="link">http://www.taodaxiong.cn/Mobile/MobileRegister?code=30234671</div>
			<div class="title">2、长按二维码保存到手机分享给好友或朋友圈</div>
			<div class="rec_fri_img text-c">
				<img src="img/recommend-qrcode1.png"/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'recommend',
		data(){
			return {
				
			}
		},
		methods:{
			onClickLeft(){
				this.$router.back();
			}
		}
	}	
</script>


<style scoped lang="scss">
	.page-recommend {
		.header {
			background: #EE580F;
			font-size: 17px;
			/deep/ .van-icon, /deep/ .van-nav-bar__title{
				color: #fff;
			}
		}
		.content {
			padding: 10px 0;
			overflow: auto;
			.title{
				font-size: 16px;
				font-weight: bold;
				margin: 10px;
			}
			.link{
				margin: 20px 20px;
				font-size: 14px;
			}
			.rec_fri_img{
				padding: 30px 0;
				img{
					width: 160px;
					height: 160px;
				}
			}
		}
	}	
</style>