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
	
	#app {
		background: #f4f4f4;
		height: 100%;
	}
</style>