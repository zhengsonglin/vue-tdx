<template>
	<div class="page-taskCenter w100 h100 over-auto">
		<div class="page-title text-c w100 c-fff fixed">
			<div class="slot-left absolute flex">
				<div class="slot-left-item relative h100">
					<div class="shadow absolute h100"></div>
					<span class="iconfont right-first icon-rili relative" @click="onRiLiClick"></span>
					<transition name="slideDown" >
						<div class="left-menu-wrap absolute over-hidden bold bg-fff" v-show="leftDateShow">
							<p @click="changeTime('today')">今日订单</p>
							<p @click="changeTime('week')">一周以内</p>
							<p @click="changeTime('month')">一月以内</p>
							<p @click="changeTime('all')">全部订单</p>
						</div>
					</transition>
				</div>
			</div>
			<div class="slot-center van-ellipsis">
				<!--任务中心-->
				<van-dropdown-menu>
				  	<van-dropdown-item v-model="value" :options="option" />
				</van-dropdown-menu>
			</div>
			<div class="slot-right absolute flex">
				<div class="slot-right-item relative h100">
					<div class="shadow absolute h100"></div>
					<span class="mui-icon iconfont mui-pull-right right-second icon-qita3 relative" @click="onMenuClick"></span>
					<transition name="slideDown">
						<div class="right-menu-wrap absolute over-hidden bold bg-fff" v-show="rightMenuShow">
							<router-link to="home" tag="p">首页</router-link>
							<router-link to="taskCenter" tag="p">任务列表</router-link>
							<router-link to="financeCenter" tag="p">我的财务</router-link>
							<router-link to="userCenter" tag="p">个人中心</router-link>
						</div>
					</transition>
				</div>
			</div>
		</div>
		<div class="define-table fixed flex bg-fff w100">
			<div :class="['tab-item', {'active':index==activeIndex}]" v-for="(item, index) in tabs" @click="onNavClick(item)">
				<span>{{item.name}}</span>
				<transition name="van-slide-down" v-if="item.children && item.children.length">
					<div class="sub-menu bg-fff w100 relative"  v-show="visible">
						<p v-for="(sItem, sIndex) in item.children" :key="sIndex" :class="['sub-tab-item', {'active':sItem.isActive}]"
							@click.stop="onChildNavClick(sItem, item)">{{sItem.name}}</p>
					</div>
				</transition>
			</div>
		</div>
		
		<div class="content">
			<!--攻略-->
			<div class="helps text-c bg-fff">
				<router-link to="newUserStrategy" tag="span" class="help-item relative flex-1 line">新手攻略</router-link>
				<router-link to="strategy" tag="span" class="help-item relative flex-1 line">定制评价攻略</router-link>
				<router-link to="saleAfterStrategy" tag="span" class="help-item relative flex-1">售后攻略</router-link>
			</div>
			
			<div class="task-center-order ">
				<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
					<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
						<van-cell v-for="(item, index) in list" :key="index" class="order-item bg-fff">
			
							<div class="order-item-top c-fff">
								<div class="task-top-left-box fl ">
									<div class="task-top-tb text-c inline-block">{{item.FHttp || "淘宝"}}</div>
									<div class="task-top-seller">{{item.FShopName || "无※※※※点"}}</div>
								</div>
								<div class="task-top-right-box fr">任务状态：{{getTaskStatus(item.FStatus)}}</div>
							</div>
							<div class="order-item-mid w100 over-hidden border-box">
								<div class="task-mid-left-box fl">
									<div class="left-box-img w100">
										<img :src="(item.FIMGUrl == '' ? item.goodimg : item.FIMGUrl)" width="100%" height="100%">
									</div>
									<div class="left-box-user text-c">
										<span class="red">账号：{{item.FWang || "zold845517008"}}</span>
									</div>
								</div>
								<div class="task-mid-right-box fr border-box">
									<div class="task-right-info"> {{item.TaskTitle != "" ? item.TaskTitle : item.FGoodsName}} </div>
									<div class="task-right-ordernum">订单编号：{{item.FOrderNumber != "" ? item.FOrderNumber : "(未填写)"}}</div>
									<div class="task-right-price">
										<span>总价：</span><span class="red">￥ {{item.FUnitPrice + "（" + item.FGoodsNum + "件*" + toDecimal2(item.price2) + "）"}}</span>
									</div>
									<div class="task-right-trueprice">
										<span> 实拍：</span><span class="red">￥{{toDecimal2(item.FUnitPrice - item.FdiffPrice)}}</span>
									</div>
									<div class="" v-if="item.IsPoint == 1">
										赠送积分：<span style="color:#fd3c3c"> {{item.PointNum}}</span>
									</div>
									<div v-if="item.FActivityTypeID == 1">
										红包金额：<span style="color:#fd3c3c">￥{{item.RedEnvelopes}}</span>
									</div>
									<div class="task-right-well over-auto bold">
										<div class="task-right-goods fl w40" @click="showGoodsInfo(item)">商品信息</div>
										<div class="task-right-goodpic fr" @click="uploadImg(item)">{{parseStateName(item)}}</div>
										<div class="task-right-goodpic fl w40 red" @click="toRefundAfter(item)" 
											v-if="item.FStatus != 1 && item.TaskID > 0">查看售后</div>
										<div class="task-right-goodpic fl w40 red" @click="applyAftersale(item)" 
											v-if="item.FStatus != 1 && item.TaskID <= 0">申请售后</div>
										<div class="task-right-goodpic fr" @click="checkRemark(item)">查看商家备注</div>
									</div>
								</div>
							</div>
							<div class="order-item-bot over-hidden">
								<div class="fl">申请时间：<span>{{moment(item.FTime).format("YYYY-MM-DD HH:mm")}}</span></div>
								<div class="fr">完成时间：
									<span>{{item.FStatus == 4?moment(item.FCompletionTime).format("YYYY-MM-DD HH:mm"):"(未完成)"}}</span>
								</div>
								<div class="AB-assets" v-if="item.FPingJiastatus != 0 && item.FPingJiastatus != 3 && item.FNewStar != '作废'">
									<router-link class="red" :to="{path:'/customEvaluation', query:{TaskId:item.FID}}" tag="span">点击查看评价内容 （请按商家要求评价，奖励{{item.FBuyUserPrice}}元哦）</router-link>
								</div>
								<div class="if_do" v-if="item.FStatus == 1">
									<div class="if_no" @click="chargeBack(item)">我要退单</div>
									<div class="if_is" @click="startTask(item)">开始任务</div>
								</div>
									
							</div>
				
						</van-cell>
					</van-list>
				</van-pull-refresh>	
				<!--<van-empty description="暂无数据" v-else />-->
			</div>
		</div>
		
		<van-dialog v-model="showProductDialog" show-cancel-button width="90%" :showConfirmButton="false">
			<template #title>
			    <div class="custom-title c-fff van-ellipsis">【{{productItem.FShopName}}】</div>
		  	</template>
			<div class="product-info">
				<div class="info-item red">店铺名: {{productItem.FShopName}}</div>
				<div class="info-item red">下单价: ￥{{toDecimal2(productItem.FGoodsNum * productItem.FUnitPrice)}}</div>
				<div class="info-item red">礼品: {{productItem.FGoodsName}}</div>
				<div class="shop-img">
					<img :src="productItem.FShopImg" width="100%" height="100%"/>
				</div>
			</div>
		</van-dialog>
	</div>
</template>

<script>
	export default {
		name:"userCenter",
		data() {
			return {
				value: 0,
			    option: [
			        { text: '免单任务中心', value: 0 },
			        { text: '返利任务中心', value: 1 },
			    ],
			    tabs:[
			    	{state:"", name:"售后", num:0, 
			    		children:[{state:"B", name:"商家发起", num:11, isActive:false},{state:"C", name:"用户发起", num:12, isActive:false}]
			    	},
			    	{state:"have", name:"已提交", num:1},
			    	{state:"will", name:"待审核", num:2},
			    	{state:"done", name:"已完成", num:3},
			    	{state:"all", name:"全部", num:4},
			    ],
			    activeIndex: 1,	//当前nav, 从0开始
			    visible: false,
			    rightMenuShow: false,
			    leftDateShow: false,
			    list: [],
				loading: false,
				finished: false,
				refreshing: false,
				pageNo: 1,
				pageSize: 30,
				showProductDialog:false,
				productItem:{},	//商品信息
				DatgeType: 'all',	//订单时间，all全部，today今天，week一周内，moth一月内
				ABOrTraffic: 'AB',
			}
		},
		computed:{
			getActiveStatus(){
				if(this.activeIndex){
					return this.tabs[this.activeIndex].state
				}else{
					return this.tabs[this.activeIndex].children.filter((item)=>item.isActive)[0].state
				}
			},
			queryForm(){
				return {
					pageindex: this.pageNo,
					pagesize: this.pageSize,
					DatgeType: this.DatgeType,
					ABOrTraffic: this.ABOrTraffic,
					Status: this.getActiveStatus || 'have',
				}
			}
			
		},
		methods:{
			//导航左侧日历
			onRiLiClick(){
				if(this.rightMenuShow)return;
				this.leftDateShow = !this.leftDateShow;
			},
			//导航右侧菜单
			onMenuClick(){
				if(this.leftDateShow)return;
				this.rightMenuShow = !this.rightMenuShow;
			},
			//按时间筛选订单
			changeTime(type){
				this.DatgeType = type;
				this.refreshing = true;
				this.onRefresh()
				this.leftDateShow = false
			},
			//tab导航切换
			onNavClick({state, name, num}){
				if(num){
					let children = this.tabs[this.activeIndex].children
					if(children && children.length){
						children.forEach((obj)=>{
							obj.isActive = false
						})
					}
					this.activeIndex = num
					this.visible = false
					this.refreshing = true;
					this.onRefresh()
				}else{
					this.visible = !this.visible
				}
			},
			//tab子菜单切换
			onChildNavClick({state, name, num}, pItem){
				this.activeIndex = pItem.num;
				pItem.children.forEach((obj)=>{
					obj.isActive = (obj.num == num)
				})
				this.visible = !this.visible
				this.refreshing = true;
				this.onRefresh()
			},
			onLoad() {
				if(this.refreshing) {
					this.pageNo = 1;
					this.list = [];
					this.refreshing = false;
				}
				
				this.API.getTaskList(this.queryForm, {showLoading: false}).then((data) => {
					this.list.push(...data);
					if(data.length < this.pageSize) {
						this.finished = true;
					} else {
						this.loading = false;
						this.pageNo++
					}
				})

			},
			onRefresh() {
				// 清空列表数据
				this.finished = false;

				// 重新加载数据
				// 将 loading 设置为 true，表示处于加载状态
				this.loading = true;
				if(this.activeIndex == 0){
					this.getTaskSaleList()
				}else{
					this.onLoad();
				}
				
			},
			//查询售后订单列表(包括用户发起和商家发起)
			getTaskSaleList(){
				if(this.refreshing) {
					this.pageNo = 1;
					this.list = [];
					this.refreshing = false;
				}

				this.API.getTaskSaleList(this.queryForm, {showLoading: false}).then((data)=>{
					this.list.push(...data);
					if(data.length < this.pageSize) {
						this.finished = true;
					} else {
						this.loading = false;
						this.pageNo++
					}
				})
			},
			getTaskStatus(FStatus){
				let text = ""
				switch(FStatus) {
				     case 1:
				        text = "已领取"
				        break;
				     case 2:
				        text = "已提交"	
				        break;
				     case 4:
				        text = "已完成"
				        break;
				    case 27:
				        text = "待审核"
				        break;
				     default:
				}
				return text;
			},
			//查看商品信息
			showGoodsInfo(item){
				//return;
				/*$.ajax({
	                url: "/MobileTaskCenter/GetTaskInfo",
	                type: "POST",
	                data: { TaskId: fid },
	                dataType: "json",
	                success: function (data) {
	                    $(".isSure-word-price").html(" 下单价：￥" + toDecimal2(data.FGoodsNum * data.FUnitPrice) + "");
	                    $("#FGoodsURL").attr("src", data.FShopImg.replace("../", "/"));
	                }
	            });*/
				
				this.API.getTaskInfo({ TaskId: item.FID }).then((data)=>{
					this.productItem = data
					this.showProductDialog = true
				})
			},
			//上传或查看好评图片
			uploadImg(item){
				this.$router.push({path:"/uploadScreenShot", query: {TaskId: item.FID, Status:"have"}})
			},
			parseStateName(item){
				let statname = "";
				let {FStatus, FPingJiastatus, FNewStar} = item
                if (FStatus != 1) {
                    if (FPingJiastatus == 0) {
                        if (FStatus == 2) {
                            statname = "上传好评截图";
                        }else {
                            statname = "查看好评截图";
                        }
                    } else {
                        if (FPingJiastatus == 1) {
                            statname = "上传定制评价截图";
                        }
                        if (FPingJiastatus == 27 ||( FPingJiastatus == 4 && FNewStar != "作废")) {
                            statname = "查看定制评价截图";
                        }else{
                            if (FStatus == 2){
                                statname = "上传好评截图";
                            }else{
                                statname = "查看好评截图";
                            }                                        
                        }
                        //else {
                        //    statname = "查看定制评价截图";
                        //}
                    }
                }
				return statname
			},
			//查看售后
			toRefundAfter(item){//item.FID
				this.$router.push({path:"/chooseSaledType", query:{taskId: item.FID, taskType:1}})
			}, 
			//申请售后
			applyAftersale(item, saleID = -1){//item.FID
				this.$router.push({path:"/refundDetial", query:{TaskID:item.FID, SalesID:saleID, taskType:1}})
			},
			//查看商家备注
			checkRemark(item){//item.FID
				this.API.getBussinessTaskInfo({ UserTaskId: item.FID }).then((data)=>{
					let message = ""
					if (data.BusinessRemark != "") {
                        message = data.BusinessRemark;
                    } else {
                        message = data.Fbz == "" ? "暂无相关备注信息" : data.Fbz
                    }
					this.$dialog.alert({
					  	title: '商家备注信息',
					  	message: message,
					  	confirmButtonText:"知道了"
					}).then(() => {
					  // on close
					});
				})
				
			},
			//开始退单
			handleChargeBack(id){
				this.API.FID({ TaskId: id }).then((data)=>{
					if (data.ErrorCode == 100) {
                        this.$toast("退单成功！");
                        this.onRefresh()
                    } else {
                        this.$toast("退单失败！");
                    }
				})
			},
			//我要退单
			chargeBack(item){
				let {FID, FStatus} = item
				if (FStatus != 1) {
	                this.$toast("该阶段不能退单");
	                return;
	            }
				
				this.$dialog.confirm({
					title: '提示',
			      	message: '确定退单？',
			    }).then(()=>{
			    	this.handleChargeBack(FID);
			    });
			},
			//开始任务
			startTask(item){
				this.$router.push({path: "/startTask", query:{TaskId: item.FID}})
			},
			
		},
		created(){
			//this.onRefresh()
		}
	}
</script>

<style lang="scss" scoped>
	
	.slideDown-enter, .slideDown-leave-to{
		/*height: 0;
		transform: translateX(80px);*/
		transform: translateY(-144px);
	}
	.slideDown-enter-to, .slideDown-leave{
		/*top: 48px;
		bottom: auto;
		height: 144px;
		transform: translateX(0px);*/
		transform: translateY(0px);
		
	}
	.slideDown-enter-active, .slideDown-leave-active {
	  transition: all 0.4s ease;
	}
	
	.red{
		color: #fd3c3c !important;
	}
	.page-taskCenter{
		.page-title{
			top: 0;
			left: 0;
			height: 48px;
			line-height: 48px;
			background-color: #fd3c3c;
			font-size: 17px;
			z-index: 100;
			.slot-left, .slot-right{
			    top: 0;
			    bottom: 0;
			    align-items: center;
			    font-size: 14px;
			    cursor: pointer;
			    .iconfont{
			    	font-size: 20px;
			    	z-index: 12;
			    }
			}
			.slot-left{left:0;
				.slot-left-item{
					padding: 0 16px;
					.shadow{
						width: 80px;
						top: 0;
						left: 0;
						z-index: 10;
						background-color: #fd3c3c;
					}
					.left-menu-wrap{
						left: 0;
						top: 48px;
						color: #333;
						width: 80px;
						line-height: 36px;
					}
				}
			}
			.slot-right{
				right:0;
				.slot-right-item{
					padding: 0 16px;
					.shadow{
						width: 80px;
						top: 0;
						right: 0;
						z-index: 10;
						background-color: #fd3c3c;
					}
					.right-menu-wrap{
						right: 0;
						top: 48px;
						color: #333;
						width: 80px;
						line-height: 36px;
					}
				}
			}
			.slot-center{
				max-width: 60%;
			    margin: 0 auto;
			    font-size: 16px;
			    .van-dropdown-menu{
			    	background: inherit;
			    	color: inherit;
			    	/deep/ .van-dropdown-menu__title{
			    		color: inherit;
			    	}
			    }
			}
		}
		.define-table{
			z-index: 10;
			left:0;
			top:48px;
			flex-direction: row;
    		justify-content: space-around;
			height: 48px;
			line-height: 48px;
			.tab-item{
				flex: 1;
				text-align: center;
				font-size: 14px;
				&.active{
					border-bottom: 2px solid red;
					>span{
						color: #fd3c3c;
    					font-weight: 900;
    				}
				}
			}
			.sub-menu{
				z-index: -2;
    			top: 3px;
    			.sub-tab-item{
    				&.active{
    					color:#fd3c3c;
    				}
    			}
			}
		} 
		.content{
			margin-top: 96px;
			padding: 14px 8px 50px;
			.helps{
				height: 32px;
				line-height: 32px;
				display: flex;
				flex-direction: row;
				box-shadow: 0 1px 2px rgba(0,0,0,.3);
				.help-item{
					width: 0;
					&.line::after{
						content: "";
						position: absolute;
						right: 0;
						top: 0;
						height: 100%;
						width: 0px;
						border: 1px solid #ccc;
						-webkit-transform: scaleX(.5);
					}
				}
				
			}
			.task-center-order{
				.order-item{
					margin-top: 16px;
					padding: 0;
					line-height: initial;
					.order-item-top{
					    height: 32px;
					    line-height: 32px;
					    padding: 0 6px;
					    background: #cdc0bf;
					    font-size: 14px;
					    .task-top-left-box{
					    	>div{
					    		display: inline-block;
					    		&.task-top-tb {
								    background-color: orange;
								    font-size: 12px;
								    width: 32px;
								    height: 24px;
								    line-height: 24px;
								}
								&.task-top-seller{
    								margin-left: 10px;
								}
					    	}
					    	
					    }
					}
					.order-item-mid{
						font-size: 13px;
						padding: 8px 8px 0;
						.task-mid-left-box{
							width: 40%;
							.left-box-img{
								height: 128px;
								img{
									object-fit: cover;
								}
							}
							.left-box-user{
								height: 40px;
    							line-height: 40px;
							}
						} 
						.task-mid-right-box{
							width: 60%;
							padding-left: 10px;
							>div{
								padding: 4px 0;
								&.task-right-well{
									.w40{
										width: 40%;
									}
									>div{
										padding: 5px 0;
										&.task-right-goodpic, &.task-right-goods {
										    color: #3b8df3;
    										display: inline-block;
										}
									}
									
								}
							}
						}
					}
					.order-item-bot{
						padding: 0 8px 8px;
						font-size: 12px;
					}
				}
			}
		}
		.van-dialog{
			.custom-title{
				background: linear-gradient(to right, #f0785d, #e35e40);
    			padding: 10px 6px;
    			margin-top: -24px;
			}
			.product-info{
				width: 90%;
    			margin: 20px auto;
    			line-height: 30px;
    			font-size: 18px;
    			.shop-img{
    				>img{
    					object-fit: contain;
    					max-height: 300px;
    				}
    			}
			}
		}
	}	
</style>