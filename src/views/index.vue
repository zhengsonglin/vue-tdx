<template>
	<div class="page-homeIndex h100">
		<div class="content h100">
			<keep-alive>
		      <router-view></router-view>
		    </keep-alive>
		</div>
		<m-tab></m-tab>
	</div>
</template>

<script>
	import MTab from 'components/m-tab/m-tab'
	export default {
		components:{
		  	MTab
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		created(){}
	}
	
	
</script>

<style scoped lang="scss">
	.page-homeIndex{
		
	}
</style>