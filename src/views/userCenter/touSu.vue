<template>
	<div class="page-index bg-fff h100 over-auto touSu">
		<div class="header-wrap">
			<van-nav-bar title="新手攻略" left-text="" right-text="" left-arrow fixed z-index="10" class="header" @click-left="onClickLeft" />
		</div>
		<div class="content">
			<van-cell-group>
				<van-cell>
					<van-row>
					  <van-col span="6">投诉QQ：</van-col>
					  <van-col span="18"><span class="bold">3023591435</span></van-col>
					</van-row>
				</van-cell>
				<van-cell>
					<van-row>
					  <van-col span="6">工作时间：</van-col>
					  <van-col span="18"><div>工作日：09:00-18:00</br>周六：10:00-18:00  ( 法定节假日除外 )</div></van-col>
					</van-row>
				</van-cell>
				<van-cell>
					<van-row>
					  <van-col span="6">投诉邮箱:</van-col>
					  <van-col span="18"><span class="bold">tousu@taodaxiong.com</span></van-col>
					</van-row>
				</van-cell>
			</van-cell-group>
		</div>
	</div>	
</template>

<script>
	export default {
		name: 'touSu',
		data() {
			return {}
		},
		methods: {
			onClickLeft() {
				this.$router.back();
			},
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
			padding: 4px 0;
		}
	}
</style>