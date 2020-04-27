<template>
	<div class="page-homeIndex">
		<div class="content">
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