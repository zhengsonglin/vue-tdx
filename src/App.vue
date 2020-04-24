<template>
	<div id="app">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive || false"></router-view>
	</div>
</template>

<style>
	*{margin:0;padding: 0;}
	html,
	body {
		height: 100%;
		overflow: hidden;
	}
	
	#app {
		background: #f4f4f4;
		height: 100%;
	}
</style>