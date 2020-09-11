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

<script lang="ts">
	import { Component, Vue, Prop } from 'vue-property-decorator';
	@Component({
		name: 'updateDescription',
		components: { },
		created() {
		},
		mounted() {}
	})
	export default class UpdateDescription extends Vue {
		private data: any[] = []
		//methods方法
		onClickLeft(): void {
			this.$router.back();
		}
		getSysInfo(): void {
			this.API.getSysInfo().then((data: any)=>{
				this.data = data
			})
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