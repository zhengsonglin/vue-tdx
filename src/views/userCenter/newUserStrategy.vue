<template>
	<div class="page-index bg-fff h100 over-auto newUserStrategy">
		<div class="header-wrap">
			<van-nav-bar title="新手攻略" left-text="" right-text="" left-arrow fixed z-index="10" class="header" @click-left="onClickLeft" />
		</div>
		<div class="content">
			<van-cell-group>
				<van-cell center>
					<p class="cell-title">1、注册账户</p>
					<p class="cell-text">邀请码需介绍人提供，在介绍人的会员中心可以看到</p>
				</van-cell>
				<van-cell is-link center to="/realNameAuthentica">
					<p class="cell-title">2、实名认证</p>
					<p class="cell-text">会员中心-“实名认证”模块里填写实名，需要提供：真实姓名、淘宝账号、对应支付宝截图</p>
				</van-cell>
				<van-cell center>
					<p class="cell-title">3、联系客服等待实名认证通过</p>
				</van-cell>
				<van-cell is-link center to="/cardBind">
					<p class="cell-title">4、绑定银行卡</p>
					<p class="cell-text">会员中心-绑定银行卡模块填写对应信息</p>
				</van-cell>
				<van-cell is-link center to="/home">
					<p class="cell-title">5、通过审核选取任务</p>
					<p class="cell-text">进入首页领取任务，限量免单模块为免单任务；熊抢购模块为真实购买</p>
				</van-cell>
				<van-cell center>
					<p class="cell-title">6、任务中心点击“开始任务”</p>
					<p class="cell-text">查看任务流程及注意事项，将提供的关键词复制到淘宝首页搜索，找不到对应商品联系客服可更换关键词</p>
				</van-cell>
				<van-cell center>
					<p class="cell-title">7、验证链接</p>
					<p class="cell-text">找到对应宝贝后复制宝贝链接在平台验证</p>
				</van-cell>
				<van-cell center>
					<p class="cell-title">8、淘宝付款</p>
					<p class="cell-text">验证成功后浏览宝贝，拍下与平台价格一致的商品，价格不一致可按照任务金额提交后在平台申请售后</p>
				</van-cell>
				<van-cell center>
					<p class="cell-title">9、提交订单号</p>
					<p class="cell-text">将淘宝的订单编号复制，粘贴到平台验证链接的下方，填写金额，点击提交</p>
				</van-cell>
				<van-cell center>
					<p class="cell-title">10、收货好评</p>
					<p class="cell-text">收到礼品后，在淘宝收货好评</p>
				</van-cell>
				<van-cell center>
					<p class="cell-title">11、上传好评截图</p>
					<p class="cell-text">在任务中心-“已提交”-点击“上传好评截图”</p>
				</van-cell>
				<van-cell center>
					<p class="cell-title">12、等待商家审核</p>
					<p class="cell-text">审核时间最长为36小时</p>
				</van-cell>
				<van-cell center>
					<p class="cell-title">13、返本金及提现</p>
					<p class="cell-text">审核完成，返还本金到余额，点击申请提现</p>
				</van-cell>
				<van-cell center>
					<p class="cell-title">14、对本操作有任何疑问均可联系淘大熊客服哦</p>
				</van-cell>
			</van-cell-group>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'newUserStrategy',
		data() {
			return {}
		},
		methods: {
			onClickLeft() {
				this.$router.back();
			},
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
			/deep/ .van-cell{
				p.cell-title{
					font-size: 15px;
				}
				p.cell-text{
					font-size: 13px;
					text-indent: 2px;
				}
			}
		}
	}
</style>