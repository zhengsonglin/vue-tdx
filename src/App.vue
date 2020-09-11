<template>
	 <!--
	<div id="app">
		<div id="nav">
		  <router-link to="/home">Home</router-link> |
		  <router-link to="/about">About</router-link>
		</div>
		<router-view/>
	</div> 
	-->

	<div id="app">
		<keep-alive><router-view v-if="$route.meta.keepAlive"></router-view></keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
	
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';

	@Component({
	  name: 'App'
	})
	export default class App extends Vue {

	}
</script>

<style>
	@import 'assets/css/common.css';
	@import 'assets/css/iconfont/icon-font.css';
	#app {
		background: #f4f4f4;
		height: 100%;
	}
</style>
