<template>
	<div class="page-index bg-fff h100 over-auto startTask">
		<div class="header-wrap">
			<van-nav-bar title="开始任务" left-text="" right-text="" left-arrow fixed z-index="10" class="header" @click-left="onClickLeft"/>
		</div>
		<div class="content">
			
		</div>
	</div>	
</template>

<script>
	import utils from "@/utils/utils"
	export default {
		name: 'startTask',
		data(){
			return {
				
			}
		},
		
		created(){
			
		},
		methods:{
			onClickLeft(){
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
			padding: 20px 0;
		}
	}		
</style>