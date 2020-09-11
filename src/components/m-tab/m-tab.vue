<template>
	<!--<div class="bottom-menu"></div>-->
	<van-tabbar v-model="active" route active-color="#07c160" inactive-color="#000">
		<!--<van-tabbar-item replace to="/home" icon="home-o">
			    <template #icon="props">
			      <img :src="props.active ? icon.active : icon.inactive" />
			    </template>
			    <span>自定义</span>
			  </van-tabbar-item>-->
		<van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
		<van-tabbar-item icon="question-o" to="/question">问题集</van-tabbar-item>
		<van-tabbar-item icon="orders-o" to="/taskCenter">订单</van-tabbar-item>
		<van-tabbar-item icon="manager" to="/userCenter">我</van-tabbar-item>
	</van-tabbar>

</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	
	@Component({
		name: 'mTab',
		created() {}
	})
	export default class Login extends Vue {
		private active: number = 0
		private icon: any = {
			active: 'https://img.yzcdn.cn/vant/user-active.png',
			inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
		}
	} 
</script>
<style>

</style>