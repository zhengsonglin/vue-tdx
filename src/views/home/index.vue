<template>
	<div class="page-index">
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
		<advertising-vertical title="商城头条" :datas="advertisingList"><van-icon name="bullhorn-o" /></advertising-vertical>

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
				]
			}
		},
		methods: {
			
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