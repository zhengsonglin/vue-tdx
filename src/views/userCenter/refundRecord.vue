<template>
	<div class="page-index refundRecord bg-fff h100 over-auto">
		<div class="header-wrap">
			<van-nav-bar
			  title="定制金返款记录"
			  left-text=""
			  right-text=""
			  left-arrow
			  fixed
			  z-index = "10"
			  class="header"
			  @click-left="onClickLeft"
			>
				<template #right>
					<van-icon name="replay" size="18" @click="refresh"/>
				</template>
			</van-nav-bar>
		</div>
		<div class="content">
			<div class="container_title text-c">定制金返款记录<i class="iconfont icon-icon-dsj"></i></div>
			<div class="refund-record">
				
				<van-list
					  v-model="loading"
					  :finished="finished"
					  finished-text="没有更多了"
					  @load="onLoad"
					>
					<van-cell>
						<div class="cell-table tb-title">
							<span>时间</span><span>订单号</span><span>记录</span><span>金额</span><span>状态</span>
						</div>
					</van-cell>
				  	<van-cell v-for="(item, index) in list" :key="index">
				  		<div class="cell-table f12 tb-data">
				  			<span>{{format2(item.FTime)}}</span><span>{{item.FOrderNumber }}</span>
				  			<span>{{(item.IsDZOrHb == 1 ? '红包返款' : '定制金返款')}}</span><span>{{toDecimal2(item.FAmount)}}</span>
				  			<span>{{parseRefundState(item)}}</span>
				  		</div>
				  	</van-cell>
				</van-list>
			</div>
			
		</div>
	</div>
</template>

<script>
	
	export default {
		name: 'refundRecord',
		data(){
			return {
				list: [],
			    loading: false,
			    finished: false,
			}
		},
		methods:{
			onClickLeft(){
				this.$router.back();
			},
	        //解析返款状态
	        parseRefundState({FPingJiastatus, FNewStar}){
	        	console.log(FPingJiastatus, FNewStar)
	        	let stateText = "已返款"
	        	return stateText
	        	/*if(FPingJiastatus == 0){
	        		stateText = "已返款"
	        	}else if(FPingJiastatus == 1){
	        		stateText = ""
	        	}else if(FPingJiastatus == 2){
	        		stateText = "待审核返款"
	        	}else if(FPingJiastatus == 3){
	        		stateText = ""
	        	}else if(FPingJiastatus == 4){
	        		stateText = FNewStar != ""?"评价作废":"已返款"
	        	}
	        	
*/
	        },
			onLoad() {
		      	// 异步更新数据
		      	this.API.getUserRefound().then((data) => {
					//console.log(data)
					this.list.push(...data);
					this.finished = true;
					/*if(data.length < this.pageSize) {
						this.finished = true;
					} else {
						this.loading = false;
						
					}*/

				})
		    },
		    refresh(){
		    	this.list = []
		    	this.finished = false
		    	this.onLoad()
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
			.refund-record{
				/deep/ .van-cell{
					padding: 10px 0;
					.cell-table{
	    				&.tb-title{
							font-weight: bold;
						}
						span{
							display: inline-block;
							text-align: center;
						}
						span:nth-of-type(1){width: 19%;}
						span:nth-of-type(2){width: 22%;padding: 0 2%;}
						span:nth-of-type(3){width: 20%;}
						span:nth-of-type(4){width: 16%;}
						span:nth-of-type(5){width: 18%;}
						&.tb-data{
							span:nth-of-type(5){
								font-size: 16px;
								color: #fd3c3c;
							}
						}
					}
					
					
				}
			}
		}
	}	
</style>