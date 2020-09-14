<template>
	<div class="page-index h100">
		<div class="content h100">
			<!--<keep-alive></keep-alive>-->
		      <router-view></router-view>
		    
		</div>
		<m-tab></m-tab>
	</div>
</template>

 <script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MTab from '@/components/m-tab/m-tab.vue'
@Component({
   name: 'index',
  components: {MTab},
   created() {}
 })
 export default class Index extends Vue {
   
 }
</script>
 
<style scoped lang="scss">
	.page-index{
		
	}
</style>