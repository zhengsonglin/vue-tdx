<template>
	<div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script>
	export default {
		name: 'App',
		methods: {},
		created() {}
	}
</script>

<!--通过style的src方式引入的外部css单位px也会被转换成rem， 而通过import方式则会保留px-->
<style src="assets/css/common.css"></style>
<style>
	/*@import 'assets/css/common.css';*/
	@import 'assets/css/iconfont/icon-font.css';
	#app {
		background: #f4f4f4;
		height: 100%;
	}
	input:-webkit-autofill{
		-webkit-box-shadow:0 0 0 1000px white inset;
	}
</style>