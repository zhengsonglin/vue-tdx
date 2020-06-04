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
					return ['img/s-1.jpg', 'img/s-2.jpg', 'img/s-3.jpg', 'img/s-4.jpg'
						/*require('img/s-1.jpg'),
						require('img/s-2.jpg'),
						require('img/s-3.jpg'),
						require('img/s-4.jpg'),*/
					]
				}
			}
		},
		data() {
			return {
				images: [
					/*require('img/s-1.jpg'),
					require('img/s-2.jpg'),
					require('img/s-3.jpg'),
					require('img/s-4.jpg'),
					*/
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