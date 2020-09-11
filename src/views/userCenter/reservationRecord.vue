<template>
	<div class="page-index reservationRecord bg-fff h100 over-auto">
		<div class="header-wrap">
			<van-nav-bar
			  title="预定任务明细"
			  left-text=""
			  right-text=""
			  left-arrow
			  fixed
			  z-index = "10"
			  class="header"
			  @click-left="onClickLeft"
			/>
		</div>
		<div class="content">
			<van-tabs @click="onClick" v-model="active">
			  <van-tab title="已预订商品">
			  	<div class="v-tab-content">
			  		<table border="0" cellspacing="0" cellpadding="0" width="100%">
			  			<tr><th>预定日期</th><th>商品详情</th><th>操作</th></tr>
			  			<tr v-for="(item, n) in list1" :key="n">
			  				<td>{{format2(item.FStarTime)}}</td><td>{{item.FName}}</td>
			  				<td><van-button type="danger" size="small" @click="handleDelete(item)">删除</van-button></td>
			  			</tr>
			  		</table>
			  	</div>
			  </van-tab>
			  <van-tab title="预订商品记录">
			  	<div class="v-tab-content">
			  		<table border="0" cellspacing="0" cellpadding="0" width="100%">
			  			<tr><th>预定日期</th><th>商品详情</th><th>操作</th></tr>
			  			<tr v-for="(item, n) in list2" :key="n">
			  				<td>{{format2(item.FStarTime)}}</td><td>{{item.FName}}</td>
			  				<td><van-button type="danger" size="small" @click="handleDelete(item)">删除</van-button></td>
			  			</tr>
			  		</table>
			  	</div>
			  </van-tab>
			</van-tabs>
		</div>
	</div>	
	
</template>

<script lang="ts">
	import { Component, Vue, Prop } from 'vue-property-decorator';
	import utils from "@/utils/utils"

	@Component({
		name: 'reservation-record',
		components: { },
		created() {
			
		},
		mounted() {}
	})
	export default class ReservationRecord extends Vue {
		private active: number = 0
		private list1: any[] = []
		private list2: any[] = []
		
		//methods方法
		onClickLeft(): void {
			this.$router.back();
		}
		//获取用户已预定商品
		getUserReserve(): void {
			this.API.getUserReserve().then((data: any)=>{
				this.list1 = data
			})
		}
		//获取用户预定商品记录
		getUserReserveRecord(): void {
			this.API.getUserReserveRecord().then((data: any)=>{
				this.list2 = data
			})
		}
		onClick(index: number, title: string): void {
		  console.log(name, title);
		  if(index==0){
		  	this.getUserReserve()
		  }else{
		  	this.getUserReserveRecord()
		  }
		}
	}
</script>



<style scoped lang="scss">
	.page-index {
		.header {
			background: #EE580F;
			font-size: 17px;
			/deep/ .van-icon, /deep/ .van-nav-bar__title{
				color: #fff;
			}
		}
		.content {
			margin-top: 46px;
			padding: 0 10px;
			.v-tab-content{
				tr{
					
					height: 50px;
					text-align: center;
					th{
						font-weight: bold;
						font-size: 16px;
						border-bottom: 1px solid #eee ;/*no*/
					}
					th:nth-of-type(1), th:nth-of-type(3){width: 30%;}
					th:nth-of-type(2){width: 40%;}
					td{
						border-bottom: 1px solid #eee ;/*no*/
					}
				}
			}
		}
	}		
</style>