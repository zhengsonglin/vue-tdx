<template>
	<div class="page-index bg-fff h100 over-auto strategy">
		<div class="header-wrap">
			<van-nav-bar title="定制评价攻略" left-text="" right-text="" left-arrow fixed z-index="10" class="header" @click-left="onClickLeft"></van-nav-bar>	
		</div>
		<div class="content">
			
		</div>
	</div>	
</template>

<script>
	export default {
		name: 'strategy',
		data(){
			return {
				
			}
		},
		methods:{
			onClickLeft(){
				this.$router.back();
			},
		},
		created(){
		
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