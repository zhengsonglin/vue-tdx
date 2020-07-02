<template>
	<div class="page-index bg-fff h100 over-auto updateDescription">
		<div class="header-wrap">
			<van-nav-bar title="更新通知" left-text="" right-text="" left-arrow fixed z-index="10" class="header" @click-left="onClickLeft" />
		</div>
		<div class="content">
			<div class="update-item" v-if="data.length">
				<p v-for="(item, index) in data" :key="index">更新内容：{{item.FUpdateContent}} <span class="fr">{{item.FTime}}</span></p>
			</div>
			<van-empty description="暂无更新内容" v-else />
		</div>
	</div>	
</template>

<script>
	//import utils from "@/utils/utils"
	export default {
		name: 'updateDescription',
		data() {
			return {
				data:[]
			}
		},
		methods: {
			onClickLeft() {
				this.$router.back();
			},
			getSysInfo(){
				this.API.getSysInfo().then((data)=>{
					this.data = data
				})
			}
		},
		created(){
			//this.getSysInfo()
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
		}
	}		
</style>