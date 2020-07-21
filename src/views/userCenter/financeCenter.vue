<template>
	<div class="page-index financeCenter bg-fff h100 over-auto">
		<div class="header-wrap">
			<van-nav-bar
			  title="财务中心"
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
			<div class="container_title text-c">交易明细<i class="iconfont icon-icon-dsj"></i></div>
			<div class="refund-record">
				
				<van-list
					  v-model="loading"
					  :finished="finished"
					  finished-text="没有更多了"
					  @load="onLoad"
					>
					<van-cell>
						
						<van-row class="cell-table tb-title text-c bold">
							  <van-col span="8">时间</van-col>
							  <van-col span="8">金额</van-col>
							  <van-col span="8">状态</van-col>
						</van-row>
					</van-cell>
				  	<van-cell v-for="(item, index) in list" :key="index">
				  		<van-row class="cell-table f12 tb-data text-c">
							  <van-col span="8">
							  	<p class="dayTime">{{moment(item.time).format("YYYY-MM-DD")}}</p>
							  	<p class="day">{{moment(item.time).format('HH:mm:ss dddd')}}</p>
							  </van-col>
							  <van-col span="8">
							  	<p class="price">{{item.money}} 元(人民币)</p>
							  	<p class="remark">{{item.comment}}</p>
							  </van-col>
							  <van-col span="8"><p :class="['state f16', item.FStatusID == 10?'green':'red']">{{ item.status|| parseRefundState(item)}}</p></van-col>
						</van-row>
				  	</van-cell>
				</van-list>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'financeCenter',
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
	        parseRefundState(item){
	        	let {FStatusID, RelationId} = item
	        	let stateText = FStatusID == 10 ? "已完成" : (RelationId == 0 ? "待打款" : "待打款（请核实卡号后联系淘大熊客服）");
	        	return stateText
	        	
	        
	        },
			onLoad() {
				let params = {
					status: 0,
					type: 4,
					start_time: "",
					end_time: "",
					page_no: 1,
					page_size: 100,
				}
		      	// 异步更新数据
		      	this.API.getPutForwardRecord(params).then(({data, error}) => {
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
		},
		created(){
			//console.log(this.moment("2020-07-16 09:36:18").format("YYYY-MM-DD HH:mm:ss"))
			//console.log(this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
			//console.log(this.moment().format('dddd'));
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
					padding: 6px 0;
					.cell-table{
						&.tb-data{
							height:48px;
						}
						p.state{
							line-height: 48px;
						}
						.red{
							color: red;
						}
						.green{
							color: #5ed08c;
						}
					}
					
					
				}
			}
		}
	}	
</style>