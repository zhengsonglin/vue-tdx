<template>
	<div id="taskList">
		<!--攻略-->
		<div class="helps flex text-c bg-fff" >
			<router-link to="newUserStrategy" tag="span" class="help-item relative flex-1 line">新手攻略</router-link>
			<router-link to="strategy" tag="span" class="help-item relative flex-1 line">定制评价攻略</router-link>
			<router-link to="saleAfterStrategy" tag="span" class="help-item relative flex-1">售后攻略</router-link>
		</div>
		
		<div class="task-center-order" >
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<van-cell v-for="(item, index) in list" :key="index" class="order-item bg-fff">
		
						<div class="order-item-top c-fff">
							<div class="task-top-left-box fl ">
								<div class="task-top-tb text-c inline-block">{{item.FHttp || "淘宝"}}</div>
								<div class="task-top-seller">{{item.shop_ww || "无※※※※点"}}</div>
							</div>
							<div class="task-top-right-box fr">任务状态：{{getTaskStatus(item.status)}}</div>
						</div>
						<div class="order-item-mid w100 over-hidden border-box">
							<div class="task-mid-left-box fl">
								<div class="left-box-img w100">
									<img :src="(item.sipping_url == '' ? item.goodimg : item.sipping_url)" width="100%" height="100%" v-lazy="(item.sipping_url == '' ? item.goodimg : item.sipping_url)">
								</div>
								<div class="left-box-user text-c">
									<span class="red">账号：{{item.user_ww || "zold845517008"}}</span>
								</div>
							</div>
							<div class="task-mid-right-box fr border-box">
								<div class="task-right-info"> {{item.title != "" ? item.title : item.shop_ww}} </div>
								<div class="task-right-ordernum" @click="doCopy(item)">订单编号：{{item.order_sn != "" ? item.order_sn : "(未填写)"}}</div>
								<div class="task-right-price">
									<span>总价：</span><span class="red">￥ {{item.reality_price }}</span>
								</div>
								<div class="task-right-trueprice">
									<span> 实拍：</span><span class="red">￥{{toDecimal2(item.price)}}</span>
								</div>
								<div class="" v-if="item.IsPoint == 1">
									赠送积分：<span style="color:#fd3c3c"> {{item.PointNum}}</span>
								</div>
								<div v-if="item.FActivityTypeID == 1">
									红包金额：<span style="color:#fd3c3c">￥{{item.RedEnvelopes}}</span>
								</div>
								<div class="task-right-well over-auto bold">
									<div class="task-right-goods fl w40" @click.stop="showGoodsInfo(item)">商品信息</div>
									<div class="task-right-goodpic fr" @click.stop="uploadImg(item)">{{parseStateName(item)}}</div>
									<div class="task-right-goodpic fl w40 red" @click.stop="toRefundAfter(item)" 
										v-if="item.FStatus != 1 && item.TaskID > 0">查看售后</div>
									<div class="task-right-goodpic fl w40 red" @click.stop="applyAftersale(item)" 
										v-if="item.FStatus != 1 && item.TaskID <= 0">申请售后</div>
									<div class="task-right-goodpic fr" @click.stop="checkRemark(item)">查看商家备注</div>
								</div>
							</div>
						</div>
						<div class="order-item-bot over-hidden">
							<div class="over-hidden">
								
							
							<div class="fl">申请时间：<span>{{moment(item.create_time).format("YYYY-MM-DD HH:mm")}}</span></div>
							<div class="fr">完成时间：
								<span>{{item.status == 4?moment(item.audit_time).format("YYYY-MM-DD HH:mm"):"(未完成)"}}</span>
							</div>
							</div>
							<div class="AB-assets" v-if="item.FPingJiastatus != 0 && item.FPingJiastatus != 3 && item.FNewStar != '作废'">
								<router-link class="red" :to="{path:'/customEvaluation', query:{TaskId:item.FID}}" tag="span">点击查看评价内容 （请按商家要求评价，奖励{{item.FBuyUserPrice}}元哦）</router-link>
							</div>
							<div class="if_do flex" v-if="item.status == 1">
								<div class="if_no inline-block text-c flex-1" @click="chargeBack(item)">我要退单</div>
								<div class="if_is inline-block text-c flex-1" @click="startTask(item)">开始任务</div>
							</div>
								
						</div>
			
					</van-cell>
				</van-list>
			</van-pull-refresh>	
		</div>
		<van-dialog v-model="showProductDialog" show-cancel-button width="90%" :showConfirmButton="false">
			<template #title>
			    <div class="custom-title c-fff van-ellipsis">【{{productItem.shop_ww}}】</div>
		  	</template>
			<div class="product-info">
				<div class="info-item red">店铺名: {{productItem.FShopName || productItem.shop_ww}}</div>
				<div class="info-item red">下单价: ￥{{toDecimal2(productItem.reality_price)}}</div>
				<div class="info-item red">礼品: {{productItem.FGoodsName || productItem.title}}</div>
				<div class="shop-img">
					<img :src="productItem.img" width="100%" height="100%"/>
				</div>
			</div>
		</van-dialog>
	</div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
@Component({
  name: 'taskList',
  components: {},
  // 生命周期, 也可以写在下面的组件方法中，组件中的生命周期方法会覆盖当前的生命周期方法
  created() {
    console.log(123321)
  }
})
export default class TaskList extends Vue {
  @Prop({
     type: [String, Number],
     required: true
  }) public readonly activeIndex?: number
  
  @Prop({
    type: Object,
    default: () => {}
  }) public readonly baseParam?: object
  
  // data属性
  private list: any[] = []
  private loading: boolean = false
  private finished: boolean = false
  private refreshing: boolean = false
  private pageNo: number = 1
  private pageSize: number = 30
  private showProductDialog: boolean = false
  private productItem: any = {}	// 商品信息
  
  // computed计算属性
  get queryForm(): any {
    return  Object.assign({}, {page: this.pageNo, page_num: this.pageSize}, this.baseParam)
  }
  // methods方法
  public onLoad(): void {
    if (this.refreshing) {
      this.pageNo = 1;
      this.list = [];
      this.refreshing = false;
    }
    
    this.API.getTaskOrderList(this.queryForm, {showLoading: false}).then((result: any) => {
      let {orderList, error} = result
      this.list.push(...orderList);
      if (orderList.length < this.pageSize) {
        this.finished = true;
      } else {
        this.loading = false;
        this.pageNo++
      }
    })
  
  },
  public onRefresh(): void {
    // 下拉刷新调用onRefresh方法时内部已经处理refreshing = true, 但其他方法调用onRefresh时，并没有设置refreshing为true,所以下面再设置一次(兼容默认刷新)
    this.refreshing = true;
    // 清空列表数据
    this.finished = false;
    // 重新加载数据
    // 将 loading 设置为 true，表示处于加载状态
    this.loading = true;
    if (this.activeIndex == 0) {
      // this.getTaskSaleList()
      this.onLoad();
    } else {
      this.onLoad();
    }
  }
  public getTaskStatus(FStatus: number): string {
    let text = ''
    switch (FStatus) {
         case 1:
            text = '已领取'
            break;
         case 2:
            text = '已提交'	
            break;
         case 4:
            text = '已完成'
            break;
        case 27:
            text = '待审核'
            break;
         default:
    }
    return text;
  }
  // 查看商品信息
  public showGoodsInfo(item: any): void {
    this.productItem = item
    this.showProductDialog = true
    return;
    this.API.getTaskInfo({ TaskId: item.FID }).then((data: any) => {
      this.productItem = data
      this.showProductDialog = true
    })
  }
  // 上传或查看好评图片
  public uploadImg(item: any): void {
    this.$router.push({path: '/uploadScreenShot', query: {TaskId: item.id, Status: 'have'}})
  }
  public parseStateName(item: any): string {
    let statname: string = '';
    let {FStatus, FPingJiastatus, FNewStar} = item
    if (FStatus != 1) {
          if (FPingJiastatus == 0) {
              if (FStatus == 2) {
                  statname = '上传好评截图';
              } else {
                  statname = '查看好评截图';
              }
          } else {
              if (FPingJiastatus == 1) {
                  statname = '上传定制评价截图';
              }
              if (FPingJiastatus == 27 || ( FPingJiastatus == 4 && FNewStar != '作废')) {
                  statname = '查看定制评价截图';
              } else {
                  if (FStatus == 2) {
                      statname = '上传好评截图';
                  } else {
                      statname = '查看好评截图';
                  }                                        
              }
              // else {
              //    statname = "查看定制评价截图";
              // }
          }
      }
    return statname
  }
  // 查看售后
  public toRefundAfter(item: any): void {// item.FID
    this.$router.push({path: '/chooseSaledType', query: {taskId: item.FID, taskType: '1'}})
  }
  // 申请售后
  public applyAftersale(item: any, saleID: any = -1): void {// item.FID
    this.$router.push({path: '/refundDetial', query: {TaskID: item.FID, SalesID: saleID, taskType: '1'}})
  }
  // 查看商家备注
  public checkRemark(item: any): void {// item.FID
    this.API.getBussinessTaskInfo({ id: item.id, type: '5' }).then((data: any) => {
      let message = ''
      if (data.mc_comment != '') {
        message = data.mc_comment;
      } else {
        message = data.Fbz == '' ? '暂无相关备注信息' : data.Fbz
      }
      this.$dialog.alert({
        title: '商家备注信息',
        message,
        confirmButtonText: '知道了'
      }).then(() => {
        // on close
      });
    })
  }
  // 开始退单
  public handleChargeBack(id: string): void {
    this.API.handleChargeBack({ TaskId: id }).then((data: any) => {
      if (data.ErrorCode == 100) {
              this.$toast('退单成功！');
              this.onRefresh()
          } else {
              this.$toast('退单失败！');
          }
    })
  }
  // 我要退单
  public chargeBack(item: any): void {
    let {FID, FStatus} = item
    if (FStatus != 1) {
          this.$toast('该阶段不能退单');
          return;
      }
    this.$dialog.confirm({
      title: '提示',
          message: '确定退单？',
      }).then(() => {
        this.handleChargeBack(FID);
      });
  }
  // 开始任务
  public startTask(item: any): void {
    this.$router.push({path: '/startTask', query: {TaskId: item.id}})
  }
  // 查询售后订单列表(包括用户发起和商家发起)
  public getTaskSaleList() {
    if (this.refreshing) {
      this.pageNo = 1;
      this.list = [];
      this.refreshing = false;
    }
    this.API.getTaskSaleList(this.queryForm, {showLoading: false}).then((data: any) => {
      this.list.push(...data);
      if (data.length < this.pageSize) {
        this.finished = true;
      } else {
        this.loading = false;
        this.pageNo++
      }
    })
  }
  // 也可以使用这种方式复制 (@click="doCopy")
  public doCopy(item: any): void {
    if (item.FOrderNumber != '') {
          this.$copyText(item.FOrderNumber).then( (e: any) => {
            this.$toast('订单号复制成功')
            console.log(e)
          }, (e: any) => {
            this.$toast('订单号复制失败')
            console.log(e)
          })
      }
  }
  // watch 监听
  @Watch('baseParam', {immediate: false, deep: true})
  public onChangeValue(newVal: any, oldVal: any) {
      this.onRefresh()
  }
}
</script>
	

<style lang="scss" scoped>
	#taskList{
		.helps{
			height: 32px;
			line-height: 32px;
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
		.mui-card{
			.helps{
				background:rgba(225, 225, 225, 0.8);
				font-size:14px;
				color:#fd3c3c;
				span{
					height:100%;
					right: 16px;
					top: 0;
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
					.if_do{
						color: #3b8df3;
						height: 24px;
						line-height: 24px;
						margin-top: 10px;
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