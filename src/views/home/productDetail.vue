<template>
	<!--productDetail-->
	<div class="page-index productDetail bg-fff h100 over-auto">
		<my-swiper class="mySwiper" height="300" :datas="imgList" :autoplayTime="3500" v-if="imgList.length"></my-swiper>
		
		<div class="content">
			<div class="com-detail detail-title over-hidden">
				<div class="cell-row row-1">
					<span class="platType fl c-fff text-c">淘宝</span><span class="productName fr">{{productInfo.FGoodsName}}</span>
				</div>
				<div class="cell-row row-2"><span class="price fl">￥{{productInfo.price}}</span>
					<div class="title-price-sur fr">剩余商品 <span class="span_Num red">{{productInfo.Num}}</span>份</div>
                </div>
			</div>
			<div class="com-detail ">
	            <span class="detail-remark red">偏远地区不发货</span>
	        </div>
	        <!-- 活动时间介绍 -->
	        <div class="com-detail detail-time">
	            <span class="iconfont icon-clock"></span>活动时间结束
	            <span class="time-over bold red">{{productInfo.fentime}}</span>
	        </div>
	        
	        <!-- 活动金额介绍 -->
	        <div class="com-detail detail-num">
	            <span>任务金额：</span>
	            <span class="num red">￥{{productInfo.price}}</span>元|返还金额：
	            <span class="num red">￥{{productInfo.price}}</span>元
	        </div>

			 <!-- 保险金 -->
	        <div class="com-detail detail-insu">
	            <span class="iconfont icon-yinxingqia"></span>商家已存入保证金{{productInfo.FALLprice}}元平台担保返款
	        </div>

			<!-- 任务流程 -->
	        <div class="com-detail detail-proc">
	            <p class="proc-title"><span class="iconfont icon-tianping"></span>任务流程</p>
	            <p>1、点击“立即领取”，获取免单资格</p>
	            <p>2、点击"开始任务"，按照任务提示，以<span class="price">{{productInfo.price}}</span>元价格去指定平台购买</p>
	            <p>3、复制宝贝链接，点击验证通过之后，填写订单号，并提交任务。</p>
	            <p>4、卖家发货→收到快递后到淘宝确认收货→给予五星好评并上传好评截图到平台→等待卖家确认。</p>
	            <p>5、卖家确认无误后，平台返款<span class="price">{{productInfo.price}}</span>元到您的账户中供您提现</p>
	        </div>

			<!-- 注意事项 -->
	        <div class="com-detail detail-item">
	            <p class="proc-title red"> <span class="iconfont icon-zhuyi-yin"></span>注意事项</p>
	            <p>1、与商家旺旺聊天时禁止提及<span class="key">“淘大熊 、试客、试单、刷单”</span>等信息，否则取消平台任务合作机会！</p>
	            <p>2、禁止使用<span class="key">信用卡、花呗、淘金币、集分宝、优惠券、红包、天猫积分</span>等淘宝商家使用的官方优惠渠道</p>
	            <p>3、禁止通过<span class="key">淘客网、返利网、一淘</span>等返现返利链接下单！</p>
	            <p>以上由于买家违规下单所产生的费用，由买家承担。淘大熊有权冻结其帐号，限制提现操作，IP列入黑名单。</p>
	        </div>
	        
	        <!-- 温馨提示 -->
	        <div class="com-detail detail-remi">
	            <p class="proc-title"><span class="iconfont icon-xiaolian"></span>温馨提示</p>
	            <p>1、用户获取免单资格后，请根据时间提示<span>及时下单并提交订单号。</span></p>
	            <p>2、若因未按时提交任务信息而被系统取消任务资格，平台概不负责！</p>
	        </div>

			<!-- 宝贝详情 -->
        	<div class="com-detail-baby" v-html="productInfo.FHtmlString"></div>

		</div>
		<div class="foot-bar fixed bg-fff text-c">
			<van-row>
			  <van-col span="12"><!--mediumseagreen-->
			  	<van-col span="12">
			  		<div class="wrap flex home">
			  			<p><span class="mui-icon iconfont icon-menu1 f20"></span></p>
			  			<router-link tag="p" to="home">首页</router-link>
			  		</div>
			  	</van-col>
			  	<van-col span="12">
			  		<div class="wrap flex customer">
			  			<p><span class="mui-icon iconfont icon-changyonglogo28 f20"></span></p>
			  			<p @click="handleHelp">客服</p>
			  		</div>
			  	</van-col>
			  </van-col>
			  <van-col span="12">
			  	<van-button type="danger" size="large" block color="#fd3c3c" class="f18" @click="submit">立即领取</van-button>
			  </van-col>
			  
			</van-row>
		</div>
		
		<van-overlay :show="showOverlay" @click="showOverlay = false">
		  <div class="overlay-wrapper bg-fff over-hidden" @click.stop>
		    	<div class="dialog-header c-fff text-c" >商品信息</div>
		    	<div class="dialog-content">
		    		<div class="row-item row-1 flex">
		    			<span class="title">商品名称:</span><span class="info flex-1">抢-奥地利进口戴诺风味酸奶2盒</span>
		    		</div>
		    		<div class="row-item row-2 flex">
		    			<span class="title">商品价格:</span><span class="info price flex-1 text-c">￥89.00</span>
		    		</div>
		    		<div class="popout-red popout-item m-top10">
	                    	注：1、领取任务后，<span>2</span>小时有效，超过<span>2</span>小时，任务自动退回，请在自动时间内退回
	                    
	                    2、每天<span>00:00</span>平台将停止抢单，<span>00:00</span>没有提交任务的订单将会自动退单，请及时完成任务！
	                    
	                </div>
		    	</div>
		    	<div class="dialog-btn text-c c-fff" @click="handleBuy">确定</div>
		  </div>
		</van-overlay>
	</div>
</template>

<script>
	import MySwiper from 'components/swiper/swiper'
	export default {
		name:"productDetail",
		components: {
			MySwiper,
		},
		computed:{
			imgList(){
				let {zpimg, FShopImg} = this.productInfo;
				let img = zpimg == "" ? FShopImg.replace("../", "/") : zpimg;
				return [img, img]
			}
		},
		data() {
			return {
				productInfo:{},
				showOverlay: false,
			}
		},
		methods:{
			handleHelp(){
				this.$toast('如有疑问，请及时联系淘大熊客服（晴天或者熊大）！');
			},
			getProductDetail(){
				let shopId = this.$route.query.shopId
				this.API.getProductDetail({ShopId:shopId}).then((data)=>{
					this.productInfo = data
				})
			},
			submit(){
				this.showOverlay = true
			},
			handleBuy(){
				
				return;
				this.API.getTheTask().then((data)=>{
					if (data.ErrorCode == 100) {
                        this.$dialog.alert({
                        	title: '恭喜你',
					      	message: '商品抢购成功，请按时完成任务！',
					    }).then(() => {
						   // this.$router.push("realNameAuthentica")
						})
                    } else if (data.ErrorCode == 101) {
                        if (data.Content == "请先进行实名认证!") {
                            this.$dialog.alert({
						      	message: data.Content,
						    }) .then(() => {
							    this.$router.push("realNameAuthentica")
							})
                        } else {
                            this.$toast({
							  	//forbidClick: true,
							  	type: "fail",
							  	message: data.Content
							});
                        }
                        $("#popout").hide();
                    } else if (data.ErrorCode == 200) {
                        if (ShopId != "0") {
                            location.href = "/Mobile/MobileLogin?type=" + ShopId;
                        } else {
                            location.href = "/Mobile/MobileLogin";
                        }

                    }

				})
			},
		},
		created(){
			this.getProductDetail();
		}
	}	
</script>

<style lang="scss" scoped>
	.page-index{
		.content{
			padding-bottom: 70px;/*no*/
			.red{
				color: #ff0045;
			}
			.com-detail{
				border-top: 1px solid #bbb;
				min-height: 50px;
				line-height: 50px;
				font-size: 15px;
				padding: 0 10px;
				color: #666;
				&.detail-title{
					height: 66px;
					padding: 5px 10px;
					border-top: 1px solid #bbb;
					.cell-row{
						overflow: hidden;
						line-height: 32px;
						&.row-1{
							.platType{
								width: 48px;
								height: 32px;
								line-height: 32px;
								background-color: orange;
							}
							.productName{
								font-size: 16px;
							}
						}
						&.row-2{
							.price{
								color: orange;
								text-decoration: line-through;
							}
							.title-price-sur{
								font-size: 10px;
							} 
						}
					}
				}
				.detail-remark{
					font-size:16px;
				}
				&.detail-time{
					font-size: 13px;
					.icon-clock{
						font-size: 18px;
						vertical-align: middle;
					}
				}
				&.detail-num{
					font-size: 14px;
				}
				&.detail-insu{
					font-size: 14px;
					color: #4fb74f;
					.icon-yinxingqia{
						font-size: 18px;
						vertical-align: middle;
					}
				}
				&.detail-proc{
					padding: 0 30px;
					font-size: 15px;
					line-height: 30px;
					.proc-title{
						color: orange;
						font-size: 18px;
						margin: 10px 0;
					}
					span.price{
						color: orange;
					}
				}
				&.detail-item{
					padding: 0 30px;
					line-height: 30px;
					.proc-title{
						font-size: 18px;
						margin: 10px 0;
						>span{
							font-size: 24px;
							vertical-align: middle;
    						margin-right: 10px;
						}
					}
					p>span.key{
    					color: #f94545;
					}
				}
				&.detail-remi{
					padding: 0 30px;
					line-height: 30px;
					.proc-title{
						color: green;
						margin: 10px 0;
						font-size: 18px;
						>span{
							font-size: 24px;
							vertical-align: middle;
    						margin-right: 10px;
						}
					}
					p>span{
						color: mediumseagreen;
					}
				}
			}
		}
		.foot-bar{
			left: 0;
			right: 0;
			bottom: 0;
			height: 50px;/*no*/
			line-height: 50px;/*no*/
			border-top: 1px solid #ccc;
			box-shadow: 0 0 6px 1px #ccc; /*no*/
			/deep/ .wrap{
				height: 50px;/*no*/
				line-height: initial;
				font-size: 16px;
				color: mediumseagreen;
				justify-content: center;
				flex-direction: column;
				box-sizing: border-box;
				&.home{
					border-right: 1px solid #ccc;
				}
				&.customer{
					border-left: 1px solid #ccc;
				}
			}
		}
		.overlay-wrapper{
			width: 80%;
			height: fit-content;
			position: absolute;
		    left: 0;
		    right: 0;
		    top: -10px;
		    bottom: 0;
		    margin: auto;
			border-radius: 8px;
			.dialog-header, .dialog-btn{
				background: linear-gradient(90deg, #ff7459, #eb3c3c);
				height: 46px;
				line-height: 46px;
				font-size: 16px;
			}
			.dialog-content{
				padding: 25px 15px 35px;
				.row-item{
					font-size: 15px;
					margin: 10px 0;
					line-height: 30px;
					.title{
						width: 70px;
						flex-basis: 70px;
					}
					.price{
						color: #f94545;
					}
				}
				.popout-red{
					color: #f94545;
					line-height: 30px;
					font-size: 14px;
				}
			}
			
		}
	}
	
</style>