<template>
	<div class="row-advertising">
		<van-row class="bg-fff">
			<van-col span="6">
				<slot name="title"><p class="adv-title">{{title}}</p></slot>
			</van-col>
			<van-col span="18">
				<slot name="right-content">
					<div class="adv-content" v-if="datas.length">
						<van-swipe class="adv-swipe" :autoplay="3000" vertical :show-indicators="false" :touchable="false">
							<van-swipe-item v-for="(item) in datas" :key="item.id">{{item.text}}</van-swipe-item>
						</van-swipe>
					</div>
				</slot>
				
			</van-col>
		</van-row>

	</div>
</template>

<script>
	export default {
		name:"advtisingVertical",
		props:{
			title:{
				type: String,
				default: "",
			},
			datas:{
				type: Array,
				default: ()=>[]
			}
		},
		data() {
			return {
				
			};
		},
	};
</script>

<style scoped lang="scss">
	.row-advertising{
		/deep/ .van-row{
			margin: 10px;
			padding: 4px 10px;
			border-radius: 10px;
			line-height: 2;
			.adv-swipe{
				height: 18px;
			}
		}
	}
</style>