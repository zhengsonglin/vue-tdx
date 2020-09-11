<template>
	<div class="page-index bg-fff h100 over-auto feedBack">
		<div class="header-wrap">
			<van-nav-bar title="意见反馈" left-text="" right-text="" left-arrow fixed z-index="10" class="header" @click-left="onClickLeft">
				<template #right>
					<van-icon name="replay" size="18" @click="getFeedBackList" style="margin-right: 20px;"/>
				    <van-icon name="add-o" size="18" @click="addfeedBack" />
				</template>
			</van-nav-bar>
		</div>
		<div class="content">
			<van-cell-group v-if="list.length">
				<van-cell>
					<van-row class="cell-table text-c bold">
					  <van-col span="8">时间</van-col>
					  <van-col span="8">标题</van-col>
					  <van-col span="8">处理情况</van-col>
					</van-row>
				</van-cell>
			  	<van-cell v-for="(item, index) in list" :key="index">
			  		<van-row class="cell-table f12 text-c">
						  <van-col span="8">
						  	<p class="dayTime">{{moment(item.FTime).format("YYYY-MM-DD")}}</p>
						  	<p class="day">{{moment(item.FTime).format('HH:mm:ss dddd')}}</p>
						  </van-col>
						  <van-col span="8" @click="toDetail(item)">
						  	<p class="fTitle f16">{{item.FViewsTitle}}</p>
						  	<p class="btn-detail">查看详情</p>
						  </van-col>
						  <van-col span="8"><p class="fStatus f16">{{item.FName}}</p></van-col>
					</van-row>
			  	</van-cell>
			</van-cell-group>
			<van-empty description="呜呜~啥也没有" v-else />
		</div>
	</div>	
</template>

<script lang="ts">
	import { Component, Vue, Prop } from 'vue-property-decorator';
	import utils from "@/utils/utils"

	@Component({
		name: 'feedBack',
		components: { },
		created() {
			
		},
		mounted() {}
	})
	export default class FeedBack extends Vue {
		private list: any[] = []
		//methods方法
		onClickLeft(): void {
			this.$router.back();
		}
		addfeedBack(): void {
			this.$router.push("addFeedBack")
		}
		getFeedBackList(): void {
			this.API.getFeedBackList().then((data: any)=>{
				this.list = data || []
			})
		}
		toDetail(item: any): void {
			this.$router.push({path:"/addFeedBack", query:{FID:item.FID}})
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
			/deep/ .cell-table{
				.fStatus{
					line-height: 46px;
				}
				.btn-detail{
					color: dodgerblue;
				}
			}
		}
	}		
</style>