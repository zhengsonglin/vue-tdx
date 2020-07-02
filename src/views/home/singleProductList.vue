<template>
	<div class="page-single w100 h100 over-auto">
		<div class="header-wrap">
			<van-nav-bar title="马上抢" left-text="" right-text="" left-arrow fixed z-index="10" class="header" @click-left="onClickLeft" />
		</div>
		<div class="content">
			<van-cell v-for="(item, index) in result.task_list" :key="index" class="product-item">
				<van-row class="bg-fff product-item-row" @click.stop="toProductDetail(item)">
					<van-col span="8">
						<div class="imgShow">
							<img :src="result.img" class="product-pic w100 h100" v-lazy="result.img" />
						</div>
					</van-col>
					<van-col span="16">
						<div class="product-info">
							<div class="p-title">{{result.title}}</div>
							<div class="progress">
								<div class="bar_box inline-block h100" :style="{width:percent(item.remain_count/item.task_count, 0)}"></div>
								<!--<div class="bar_txt w100 h100 c-fff">剩余{{item.remain_count}}件/共{{item.task_count}}件{{percent(item.remain_count/item.task_count, 0)}} </div>-->
							</div>
							<!--<div class="p-tag"><span class="inline-block" v-show="item.is_img==1">需晒图</span></div>-->
							<div class="pro-num">
								<p>已抢 <span class="red">{{item.task_count - item.remain_count}}</span>件 共 <span class="red">{{item.task_count}}件</span></p>
								<p>任务金额:<span class="red">{{toDecimal2(item.price)}}元</span>返还金额:<span class="red">{{toDecimal2(item.price)}}</span></p>
								<p class="red">截止日期:{{item.task_end}}</p>
								<p class="content_insure f12">商家已存入保证金{{toDecimal2(item.price)}}元平台担保返款</p>
							</div>
							<div class="btn-wrap over-auto">
								<p class="buy-btn c-fff text-c inline-block" @click.stop="toProductDetail(item)">马上抢</p>
							</div>
							
						</div>
					</van-col>
				</van-row>
			</van-cell>
		</div>
	</div>	
</template>

<script>
	export default {
		name: "singleProductList",
		data(){
			return {
				result: {
					task_list:[]
				}
			}
		},
		methods: {
			onClickLeft() {
				this.$router.back();
			},
			getSingleProductList(){
				this.API.getSingleProductList({pa_id: this.paId}).then(({data,error})=>{
					this.result = data
				})
			},
			toProductDetail(item){
				console.log(item)
				if(this.result.activity_type == 1) {
					this.$router.push({
						path: "/productDetail",
						query: {
							tId: item.t_id
						}
					});
				} else if(this.result.activity_type == 2) {
					this.$router.push({
						path: "/skillTaskDetail",
						query: {
							tId: item.t_id
						}
					});
				}
			}
		},
		created(){
			this.paId = this.$route.query.paId;
			this.getSingleProductList();
		}
	}
</script>

<style lang="scss" scoped>
	.page-single{
		.header {
			background: #EE580F;
			font-size: 17px;
			/deep/ .van-icon,
			/deep/ .van-nav-bar__title {
				color: #fff;
			}
		}
		.content{
			margin-top: 48px;
			.product-item {
				min-height: 120px;
				margin-bottom: 10px;
				width: auto;
				padding: 0;
				border-radius: 6px;
				.product-item-row {
					padding: 6px 0 10px;
					.imgShow {
						margin: 6px;
						.product-pic {
							object-fit: cover;
							min-height: 100px;
							max-height: 150px;
						}
					}
					.product-info {
						.p-title {
							font-size: 14px;
							margin-left: 12px;
						}
						.pro-num{
							margin: 4px 10px;
							>p{
								line-height: 1;
								margin: 6px 0;
							}
							.content_insure{
								color: #999;
								
							}
						}
						.progress {
							width: 70%;
							position: relative;
							height: 10px;
							background-color: #ecc5ba;
							border-radius: 10px;
							margin-left: 10px;
							line-height: 1;
							.bar_box {
								background: rgb(255, 85, 0);
								border-radius: 0.5rem;
							}
							/*.bar_txt {
								position: absolute;
								left: 0;
								top: 0;
								font-size: 12px;
								text-indent: 10px;
							}*/
						}
						.btn-wrap .buy-btn{
							margin-left: 10px;
						    width: 136px;
						    height: 20px;
						    line-height: 20px;
						    border-radius: 4px;
						    box-shadow: 0 1px 1px 0 rgba(255,201,169,.43);
						    background-image: linear-gradient(-90deg,#f95e26,#fb9a0f);
						}
					}
				}	
			}
		}
	}
</style>