<template>
	<div class="page-index h100 over-auto" id="page-index">
		<van-search v-model="searchKey" shape="round" :background="searchBg" placeholder="请输入搜索关键词" @search="onSearch" class="search-com w100" />
		<my-swiper class="mySwiper" height="200"></my-swiper>

		<van-row class="activity-type">
			<van-col span="12">
				<!--<div class="row bg-fff text-c" @click="test">
					<img src="../../assets/img/nav-1.png" />
				</div>-->
				<router-link to="sortProduct" tag="div" class="row bg-fff text-c"><img src="../../assets/img/nav-1.png" /></router-link>
			</van-col>
			<van-col span="12">
				<div class="row bg-fff text-c">
					<img src="../../assets/img/nav-2.png" />
				</div>
			</van-col>
		</van-row>
		<advertising-vertical :datas="advertisingList">
			<template v-slot:title>
				<p class="adv-title">商城头条
					<van-icon name="bullhorn-o" />
				</p>
			</template>
		</advertising-vertical>
		<div class="content">
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<van-cell v-for="(item, index) in list" :key="index" class="product-item">
						
							<van-row class="bg-fff product-item-row" @click.stop="toProductDetail(item)">
								<van-col span="8">
									<div class="imgShow">
										<img :src="item.FIMGUrl" class="product-pic w100 h100" />
									</div>
								</van-col>
								<van-col span="16">
									<div class="product-info">
										<div class="p-title">{{item.FGoodsName}}</div>
										<div class="p-tag"><span class="inline-block">需晒图</span></div>
										<div class="p-price over-auto"><span>垫付:</span><span class="price">￥{{item.PayMentAmount}}</span>
											<van-button type="danger" size="small" class="buy-btn fr c-fff"  @click.stop="toProductDetail(item)">马上抢</van-button>
										</div>
										<div class="progress">
											<div class="bar_box inline-block h100" :style="{width:dyHeight}"></div>
											<div class="bar_txt w100 h100 c-fff">剩余2件/共5件40% </div>
										</div>
									</div>
								</van-col>
							</van-row>
						
					</van-cell>
				</van-list>
			</van-pull-refresh>
		</div>
		<!--子页面-->
		<router-view></router-view>
		
		<p style="height: 50px;"></p>
	</div>
</template>

<script>
	import MySwiper from 'components/swiper/swiper'
	import advertisingVertical from 'components/advertising/advertising-vertical'
	export default {
		components: {
			MySwiper,
			advertisingVertical
		},

		data() {
			return {
				advertisingList: [{
						id: "1",
						text: "全国商品免费包邮领取"
					},
					{
						id: "2",
						text: "【紧急通知】禁止吸粉"
					},
					{
						id: "3",
						text: "淘大熊商家操作教程"
					},
					{
						id: "4",
						text: "平台内测，实名认证"
					},
					{
						id: "5",
						text: "实名认证联系客服审核"
					},
					{
						id: "6",
						text: "【必读】放单节奏问题"
					},
				],
				list: [],
				loading: false,
				finished: false,
				refreshing: false,
				pageNo: 1,
				pageSize: 30,
				searchKey: "",
				dyHeight: "40%",
				searchBg: "rgba(255, 0, 0, 0.2)", //rgba(79, 192, 141, 0.2)
				swiperHeight: "",
			}
		},
		methods: {
			onLoad() {
				if(this.refreshing) {
					this.pageNo = 1;
					this.list = [];
					this.refreshing = false;
				}
				this.API.getProductList({
					page: this.pageNo,
					size: this.pageSize,
					key: this.searchKey,
					category: 13,
					status: 1,
				},{showLoading: false}).then((data) => {
					//console.log(data)
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
				this.onLoad();
			},
			setSearchBg() {
				var wScoll = document.getElementById("page-index").scrollTop,
					ratio = (wScoll / this.swiperHeight).toFixed(2);
				if(ratio < 0.2) {
					ratio = 0.2
				} else if(ratio > 1) {
					ratio = 1
				}
				this.searchBg = `rgba(255, 0, 0, ${ratio})`
			},
			onSearch() {

				this.refreshing = true
				// 清空列表数据
				this.finished = false;

				this.onLoad();
			},
			toProductDetail(item){
				this.$router.push({path:"/productDetail", query:{shopId: item.FID}});
			},
		},
		mounted() {
			console.log(123)
			let box = document.getElementById("page-index")
			this.swiperHeight = document.getElementsByClassName("mySwiper")[0].offsetHeight

			if(box) {
				box.onscroll = this.setSearchBg
			}

		}
	}
</script>

<style scoped lang="scss">
	.page-index {
		/deep/ .activity-type {
			margin: 10px;
		}
		.search-com {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 10;
		}
		.content {
			.product-item {
				min-height: 120px;
				margin: 0 10px 10px;
				width: auto;
				padding: 0;
				border-radius: 6px;
				.product-item-row {
					
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
							margin: 4px 0 5px 14px;
						}
						.p-tag {
							margin: 5px 0 5px 14px;
							span {
								color: #ed7739;
								background: #fde9e0;
								padding: 2px 3px;
							}
						}
						.p-price {
							margin: 5px 0 5px 14px;
							>span {
								vertical-align: middle;
								color: #8f8f94;
								&.price {
									color: #fd3c3c;
									font-size: 16px;
									font-weight: 800;
									margin-left: 10px;
								}
							}
							.buy-btn {
								height: 24px;
								line-height: 20px;
								border-radius: 4px;
								margin-right: 10px;
							}
						}
						.progress {
							width: 70%;
							position: relative;
							height: 14px;
							background-color: #ecc5ba;
							border-radius: 10px;
							margin-left: 10px;
							line-height: 1;
							.bar_box {
								background-color: #fd3c3c;
								border-radius: 0.5rem;
							}
							.bar_txt {
								position: absolute;
								left: 0;
								top: 0;
								font-size: 12px;
								text-indent: 10px;
							}
						}
					}
				}
			}
			/deep/ .van-list__finished-text{
				margin-top: -10px;
			}
		}
	}
</style>