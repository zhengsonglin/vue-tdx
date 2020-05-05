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

<script>
	export default {
		name: 'reservation-record',
		data(){
			return {
				active:0,
				list1: [],
				list2: [],
			}
		},
		methods:{
			onClickLeft(){
				this.$router.back();
			},
			//获取用户已预定商品
			getUserReserve(){
				this.API.getUserReserve().then((data)=>{
					this.list1 = data
				})
			},
			//获取用户预定商品记录
			getUserReserveRecord(){
				this.API.getUserReserveRecord().then((data)=>{
					this.list2 = data
				})
			},
			onClick(index, title) {
		      console.log(name, title);
		      if(index==0){
		      	this.getUserReserve()
		      }else{
		      	this.getUserReserveRecord()
		      }
		    },
		    deleteUserReserve(item){
		    	this.API.deleteUserReserve({fid:item.FID }).then((data)=>{
		    		if (data.ErrorCode == 100) {
                        this.$toast('操作成功！');
                        if(this.active==0){
					      	this.getUserReserve()
					    }else{
					      	this.getUserReserveRecord()
					    }
                    } else if (data.ErrorCode == 101) {
                        this.$toast(data.Content);
                    } else {
                        var url = "/MobileUserCenter/ReservationRecord";
                        //location.href = "/Mobile/MobileLogin?rturl=" + url;
                        this.$router.push({path:"/login", query:{rturl:url}})
                    }

		    	})
		    },
		    handleDelete(item){
				this.$dialog.confirm({message: '确定要删除吗?'}).then(() => {
					console.log(678)
				    this.deleteUserReserve(item)
				}).catch((e) => {
					console.log(e)
				    // on cancel
				});
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