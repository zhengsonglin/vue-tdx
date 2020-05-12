<template>
	<van-swipe class="my-swipe" :autoplay="autoplayTime" indicator-color="white" :height="height">
		<van-swipe-item v-for="(image, index) in datas" :key="index">
			<img v-lazy="image" width="100%" height="100%" />
		</van-swipe-item>
	</van-swipe>
</template>

<script>
	export default {
		name:"MySwiper",
		props:{
			autoplayTime: {
				type: String|Number,
				default: "3000",
			},
			height:{
				type: String|Number,
				default:"200"
			},
			datas:{
				type: Array,
				default: ()=>{
					return [
						require('assets/img/s-1.jpg'),
						require('assets/img/s-2.jpg'),
						require('assets/img/s-3.jpg'),
						require('assets/img/s-4.jpg'),
					]
				}
			}
		},
		data() {
			return {
				images: [
					require('assets/img/s-1.jpg'),
					require('assets/img/s-2.jpg'),
					require('assets/img/s-3.jpg'),
					require('assets/img/s-4.jpg'),
					
				],
			};
		},
	};
</script>

<style scoped lang="scss">
	.my-swipe .van-swipe-item {
	    color: #fff;
	    font-size: 20px;
	    line-height: 150px;
	    text-align: center;
	    //background-color: #39a9ed;
	    img{
	    	object-fit: fill;
	    }
	}
</style>