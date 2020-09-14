<template>
	<div class="page-index bg-fff h100 over-auto strategy">
		<div class="header-wrap">
			<van-nav-bar title="定制评价攻略" left-text="" right-text="" left-arrow fixed z-index="10" class="header" @click-left="onClickLeft"></van-nav-bar>	
		</div>
		<div class="content">
			<div class="cell-row">
				<p class="cell-title">1.收到定制评价的短信提醒后进入<span class="red">任务中心-限量免单</span></p>
				<img src="img/help/d1.png"/>
			</div>
			<div class="cell-row">
				<p class="cell-title">2.点击<span class="red">已提交</span>，找到下方有一行红字的任务 </p>
				<img src="img/help/d2.png"/>
			</div>
			<div class="cell-row">
				<p class="cell-title">3.收到礼品后，<span class="red">点击红字</span> 查看商家定制文字及评价，按照要求评价</p>
				<img src="img/help/d3.png"/>
			</div>
			<div class="cell-row">
				<p class="cell-title">4.评价完之后点击<span class="red">提交好评截图</span> </p>
				<img src="img/help/d4.png"/>
			</div>
			<div class="cell-row">
				<p class="cell-title">5.商家确认无误后审核通过，平台奖励<span class="red">¥1元到</span> 您的余额供您提现，可在<span class="red">定制金返款</span> 查询记录</p>
				<img src="img/help/d5.png"/>
			</div>
		</div>
	</div>	
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({
  name: 'strategy',
  components: { },
  created() {
  },
  mounted() {}
})
export default class Strategy extends Vue {
  // methods方法
  public onClickLeft(): void {
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