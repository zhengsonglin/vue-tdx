<template>
	<div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		name: 'App',
		computed: {
			...mapState(['categoryList'])
		},
		methods: {
			initData() {
				if (!this.categoryList || !this.categoryList.length){
					//查询所有商品类别
					this.API.getCategory().then(({data, error}) => {
						if(error.errno===200){
							this.setCategoryList(data)
						}
					})
				}
			},
			...mapMutations({
				setCategoryList: 'setCategoryList'
			})
		},
		created() {
			this.initData()

		}
	}
</script>

<style>
	@import 'assets/css/common.css';
	@import 'assets/css/iconfont/icon-font.css';
	#app {
		background: #f4f4f4;
		height: 100%;
	}
	input:-webkit-autofill{
		-webkit-box-shadow:0 0 0 1000px white inset;
	}
</style>