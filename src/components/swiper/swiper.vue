<template>
	<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" height="200">
		<van-swipe-item v-for="(image, index) in images" :key="index">
			<img v-lazy="image" width="100%" height="100%" />
		</van-swipe-item>
	</van-swipe>
</template>

<script>
	export default {
		name:"MySwiper",
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