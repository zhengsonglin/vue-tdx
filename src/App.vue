<template>
	<div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

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