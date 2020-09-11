<template>
	<div class="page-index bg-fff h100 over-auto strategy">
		<div class="header-wrap">
			<van-nav-bar title="售后攻略" left-text="" right-text="" left-arrow fixed z-index="10" class="header" @click-left="onClickLeft"></van-nav-bar>	
		</div>
		<div class="content">
			<van-tabs v-model="active">
			  <van-tab title="用户申请售后流程"  name="a">
				  	<div class="cell-row">
						<p class="cell-title">1.点击任务中心，选择订单类型，找到需要申请售后的订单，然后点击申请售后按钮。</p>
						<img src="img/help/S_1.png"/>
					</div>
					<div class="cell-row">
						<p class="cell-title">2.选择售后类型（资金问题）</p>
						<img src="img/help/S_2.png"/>
					</div>
					<div class="cell-row">
						<p class="cell-title">3.填写实拍金额（必填）、售后说明（选填），然后上传售后凭证（必填），最后点击提交按钮</p>
						<img src="img/help/S_3.png"/>
					</div>
					<div class="cell-row">
						<p class="cell-title">4.等待处理，可以根据实际反馈情况选择修改申请、撤销申请、客服介入、再次申请。</p>
						<img src="img/help/S_4.png"/>
					</div>
					<div class="cell-row">
						<p class="cell-title">5.售后完成，可以查看协商历史</p>
						<img src="img/help/S_5.png"/>
					</div>
					<div class="cell-row">
						<p class="cell-title">6.查看协商历史</p>
						<img src="img/help/S_6.png"/>
					</div>
			  </van-tab>
			  <van-tab title="用户处理售后流程"  name="b">
			  		<div class="cell-row">
						<p class="cell-title">1.在任务中心找到有售后的订单，点击“查看售后”</p>
						<img src="img/help/S_7.png"/>
					</div>
					<div class="cell-row">
						<p class="cell-title">2.查看商家发起的资金问题</p>
						<img src="img/help/S_8.png"/>
					</div>
					<div class="cell-row">
						<p class="cell-title">3.查看售后详情，根据实际情况选择同意、驳回、客服介入、申请售后</p>
						<img src="img/help/S_9.png"/>
					</div>
					<div class="cell-row">
						<p class="cell-title">4.售后成功</p>
						<img src="img/help/S_10.png"/>
					</div>
			  	
			  </van-tab>
			</van-tabs>
		</div>
	</div>	
</template>

<script lang="ts">
	import { Component, Vue, Prop } from 'vue-property-decorator';
	import utils from "@/utils/utils"

	@Component({
		name: 'saleAfterStrategy',
		components: { },
		created() {
			
		},
		mounted() {}
	})
	export default class SaleAfterStrategy extends Vue {
		private active: string = "a"
		//methods方法
		onClickLeft(): void {
			this.$router.back();
		}
	}
</script>		



<style scoped lang="scss">
	.page-index {
		.header {
			background: #EE580F;
			font-size: 17px;
			/deep/ .van-icon,
			/deep/ .van-nav-bar__title {
				color: #fff;
			}
		}
		.content {
			margin-top: 46px;
			padding: 20px 0;
			.cell-row{
				font-size: 18px;
				margin-top: 20px;
				p{
					padding: 0 15px;
				}
				img{
					width: 70%;
					margin: 10px auto;
					display: block;
				}
				.red{
					color: red;
				}
			}
		}
	}		
</style>