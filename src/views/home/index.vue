<template>
	<div class="page-index h100 over-auto">
		<my-swiper></my-swiper>
		<van-row>
		  <van-col span="12">
		  	<div class="row bg-fff text-c">
		  		<img src="../../assets/img/nav-1.png"/>
		  	</div>
		  </van-col>
		  <van-col span="12">
		  	<div class="row bg-fff text-c">
		  		<img src="../../assets/img/nav-2.png"/>
		  	</div>
		  </van-col>
		</van-row>
		<advertising-vertical :datas="advertisingList">
			<template v-slot:title>
			    <p class="adv-title">商城头条<van-icon name="bullhorn-o" /></p>
			</template>
		</advertising-vertical>
		<div class="content">
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			  <van-list
			    v-model="loading"
			    :finished="finished"
			    finished-text="没有更多了"
			    @load="onLoad"
			  >
			    <van-cell v-for="item in list" :key="item" :title="item" />
			  </van-list>
			</van-pull-refresh>
		</div>
	</div>
</template>

<script>
	import MySwiper from 'components/swiper/swiper'
	import advertisingVertical from 'components/advertising/advertising-vertical'
	export default {
		components:{
		  	MySwiper, advertisingVertical
		},
		data() {
			return {
				advertisingList:[
					{id:"1", text:"全国商品免费包邮领取"},
					{id:"2", text:"【紧急通知】禁止吸粉"},
					{id:"3", text:"淘大熊商家操作教程"},
					{id:"4", text:"平台内测，实名认证"},
					{id:"5", text:"实名认证联系客服审核"},
					{id:"6", text:"【必读】放单节奏问题"},
				],
				list: [],
			    loading: false,
			    finished: false,
			    refreshing: false,
			}
		},
		methods: {
			onLoad() {
			    setTimeout(() => {
			        if (this.refreshing) {
			          	this.list = [];
			          	this.refreshing = false;
			        }
			
			        for (let i = 0; i < 10; i++) {
			          	this.list.push(this.list.length + 1);
			        }
			        this.loading = false;
			
			        if (this.list.length >= 40) {
			          	this.finished = true;
			        }
			    }, 1000);
		    },
		    onRefresh() {
			      // 清空列表数据
			      this.finished = false;
			
			      // 重新加载数据
			      // 将 loading 设置为 true，表示处于加载状态
			      this.loading = true;
			      this.onLoad();
		    },
		},
		created(){}
	}
	
	
</script>

<style scoped lang="scss">
	.page-index{
		/deep/ .van-row{
			margin: 10px;
		}
	}
</style>