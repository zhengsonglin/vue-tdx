<template>
	<div class="page-index bg-fff w100 h100 over-auto sortProduct absolute">
		<div class="header-wrap">
			<van-nav-bar title="商品分类" left-text="" right-text="" left-arrow fixed z-index="10" class="header" @click-left="onClickLeft"></van-nav-bar>	
		</div>
		<div class="content flex">
			<div class="left-item h100 over-auto">
				<div class="nav-item" v-for="(item,index) in categoryList" :key="index" @clcik.stop="changeCategory(item)">
					{{item.FName}}
				</div>
			</div>
			<div class="right-item flex-1 h100 over-auto">
				<div class="right-wraper h100">
					<div class="top-item flex">
						<div class="status-tag flex-1" v-for="(statusItem, num) in productStatus" :key="num" @clcik.stop="changeQueryStatus(statusItem)">{{statusItem.name}}</div>
					</div>
					<div class="bottom-item over-auto">
						<div class="product-item flex bg-fff" v-for="(item, i) in productList" :key="i">
							<div class="left-img">
								<img :src="(item.FIMGUrl == '' ? item.ShopImg.replace('../', '/') : item.FIMGUrl)" width="100%" height="100%"/>
							</div>
							<div class="right-content flex-1">
								<div class="row-1 van-ellipsis">{{item.FGoodsName}}</div>
								<div class="row-2">
									<span v-show="item.FGoodsObjectID == 25 && item.SlideShow == 1">需晒图</span>
								</div>
								<div class="row-3 over-hidden">
									<div class="left fl">
										<span class="title">垫付:</span> <p class="red inline-block">￥<span class="price bold">{{item.PayMentAmount}}</span></p></span>
									</div>
									<div class="right fr">
										<span class="btn inline-block c-fff  text-c">预定 &gt;</span>
									</div>
								</div>
								<div class="row-4 relative">
									<div class="bar_box h100" :style="{color:'#666',width:percent(item.NumberRemain/item.FTaskNum, 3)}"></div>
									<div class="bar_word w100 h100 c-fff absolute border-box">剩余{{item.NumberRemain}}件/共{{item.FTaskNum}}件 
										{{percent( parseInt(item.NumberRemain)/item.FTaskNum, 0) }}</div>
									
									<!--
										
										var hasbuy = parseInt(data[i].NumberRemain);
                        var tcount = data[i].FTaskNum;
                        var bfb = Math.round(hasbuy / tcount * 10000) / 100.00 + "%";

										
									-->
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>	
	</div>
</template>

<script>
	export default {
		name: 'sortProduct',
		data() {
			return {
				categoryList:[],
				productStatus:[
					{name:"进行中", status:"1"},
					{name:"即将开始", status:"2"},
					{name:"可预约", status:"3"},
				],
				productList:[],
				pageNo: 1,
				pageSize: 30,
				searchKey: "",
				category: 13,
				status: 1,
			}
		},
		computed:{
			getParams(){
				return {
					page: this.pageNo,
					size: this.pageSize,
					key: this.searchKey,
					category: this.category,
					status: this.status
				}
			}
		},
		methods:{
			onClickLeft() {
				this.$router.back();
			},
			//改变查询商品类别
			changeCategory(item){
				this.category = item.FID;
				this.getProductList()
			},
			//改变查询商品状态
			changeQueryStatus(item){
				this.status = item.status
				this.getProductList()
			},
			//查询所有商品类别
			getCategory(){
				return this.API.getCategory().then((data)=>{
					this.categoryList = data
				})
			},
			//查询单个类别下商品列表
			getProductList(){
				this.API.getProductList(this.getParams).then((data)=>{
					this.productList = data
				})
			}
		},
		created(){
			this.getCategory().then(()=>{
				this.getProductList()
			});
			
		}
	}	
</script>


<style scoped lang="scss">
	.page-index {
		top:0;
		left: 0;
		z-index: 10;
		.header-wrap{
			.header {
				background: #EE580F;
				font-size: 17px;
				/deep/ .van-icon,
				/deep/ .van-nav-bar__title {
					color: #fff;
				}
			}
		}
		.content {
			margin-top: 46px;
			/*padding: 10px;*/
			height: calc(100% - 46px);
			.left-item{
				width: 64px;
				flex-basis: 64px;
				border-right: 1px solid #ddd;
				.nav-item{
					height: 48px;
					line-height: 48px;
					text-align: center;
					font-size: 14px;
					border-bottom: 1px solid #ddd;
				}
			}
			.right-item{
				.right-wraper{
					.top-item{
						border-bottom: 1px solid #ddd;
						.status-tag{
							height: 48px;
							line-height: 48px;
							text-align: center;
						}
					}
					.bottom-item{
						background-color: #efeff4;
						height: calc(100% - 48px);
						.product-item{
							flex-direction: row;
							margin-bottom: 10px;
							padding: 5px 10px;
							.left-img{
								width: 94px;
								flex-basis: 94px;
								height: 94px;
							} 
							.right-content{
								box-sizing: border-box;
								padding-left: 16px;
								.row-1{
									font-size: 16px;
									line-height: 30px;
								}
								.row-2{
									height: 20px;
								}
								.row-3{
									.left{
										span.title{
											color: #8f8f94;
											font-size: 12px;
										}
										p.red{
											color: #fd3c3c;
											font-size: 16px;
										}
									}
									.right{
										.btn{
											background-color: #fd3c3c;
											padding: 4px 8px;
    										border-radius: 6px;
										}
									}
								}
								.row-4{
									width: 70%;
									height: 14px;
									margin-top: 10px;
									background-color: #ecc5ba;
									border-radius: 6px;
									line-height: 1;
									.bar_box{
										background-color: rgb(253, 60, 60);  border-radius: 0.5rem;
									} 
									.bar_word{
										padding-left:12px;
										font-size: 10px;
										top: 0;left: 0;
									}
								}
							}
						}
					}
				} 
			}
		}
	}		
</style>