<template>
	<div class="page-index withDrawCash bg-fff h100 over-auto">
		<div class="header-wrap">
			<van-nav-bar
			  title="账户提现"
			  left-text=""
			  right-text=""
			  left-arrow
			  fixed
			  z-index = "10"
			  class="header"
			  @click-left="onClickLeft"
			>
				<template #right>
					<van-icon name="replay" size="18" @click="getWithDrawCashInfo"/>
				</template>
			</van-nav-bar>
		</div>
		<div class="content">
			<van-cell-group>
			  	<van-field label="可提现金额 :" readonly input-align="right" label-align="right" label-width="94">
					<template #input>
					    <p class="green">￥{{toDecimal2(withDrawCashInfo.balance)}}</p>
					</template>
					<template #right-icon>
					    <van-icon name="success" color="#3cb926" size="20"/>
					</template>
				</van-field>
				<!--<van-field label="提现方式 :" value="输入框已禁用" readonly input-align="right" label-align="right" label-width="94"/>-->
			  	<van-field name="radio" label="提现方式 :" label-align="right" readonly class="cell-radio-field">
					  <template #input>
					    <van-radio-group v-model="withdrawalWay" direction="horizontal">
					      <van-radio name="0">银行卡</van-radio>
					      <!--<van-radio name="1">微信</van-radio>-->
					    </van-radio-group>
					  </template>
				</van-field>
			  	<van-field label="姓名 :" :value="withDrawCashInfo.real_name" readonly input-align="right" label-align="right" />
			  	<van-field label="银行名称 :" :value="withDrawCashInfo.bank" readonly input-align="right" label-align="right" />
			  	<van-field label="银行卡号 :" :value="withDrawCashInfo.bank_card" readonly input-align="right" label-align="right" />
			  	<van-field label="提现金额 :" :value="toDecimal2(withDrawCashInfo.balance)" readonly input-align="right" label-align="right" />
			  	
			  	
			</van-cell-group>
			<van-button block  color="linear-gradient(to right, #4bb0ff, #6149f6)"  @click="submit" class="btn-submit">提交申请</van-button>
			
			<!-- 用户相关说明 -->
	        <div class="about-user">
	            <h4>用户提现相关说明</h4>
	            <ul>
	                <li>1、平台暂时只支持提现到银行卡账户</li>
	                <li>2、在国家法定假日和双休日期间，用户可以申请提现，但会在假期后第一个工作日予以处理。由此造成的不便，请多多谅解！</li>
	                <li>3、提现后需要2-3个工作日安排提现打款</li>
	                <li>4、提现金额不得低于1元，提现的所有手续费均由平台承担</li>
	                <li>5、如有相关问题，请联系平台客服咨询！</li>
	            </ul>
	        </div>
		</div>
		
		<van-overlay :show="showTips" @click="showTips = false" z-index="100" class-name="overlay-tips">
		  	<div class="wrapper h100" @click.stop="showTips = false">
		  		<div class="tips-content over-hidden" @click.stop>
			    	<div class="header c-fff text-c">提醒</div>
			    	<div class="tips bg-fff text-c">
			    		<p>因财务调整，建议优先选择绑定招商银行卡，招行卡提现会更便捷快速，其他银行卡提现、到账时间不变</p>
			    	</div>
		    	</div>
		  	</div>
		</van-overlay>
	</div>	
</template>

<script>
	export default {
		name: 'withDrawCash',
		data(){
			return {
				withDrawCashInfo: {},
			    withdrawalWay:'0',
			    showTips: true
			}
		},
		methods:{
			onClickLeft(){
				this.$router.back();
			},
			getWithDrawCashInfo(){
		    	this.API.getWithDrawCashInfo().then(({data, error})=>{
		    		this.withDrawCashInfo = data
		    	})
		    },
		    submit(){
		   		this.API.handleWithDrawCash(this.withDrawCashInfo).then(({data, error})=>{
		   			if (error.errno == 200) {
                        this.$toast({
                        	duration: 600, // 持续展示 toast
						  	forbidClick: true,
						  	type: "success",
						  	message: '提现成功,请等待系统审核！',
						  	onClose:()=>{this.$router.back()}
						});
                        
                    } else if (error.errno == 101) {
                        if (data.Content == "无支行信息") {
                            this.$router.push("/cardBind")
                        } else {
                            this.$toast({
							  	//forbidClick: true,
							  	type: "fail",
							  	message: error.usermsg
							});
                        }
                    } else if (error.errno != 200) {
                        //var url = "/MobileUserCenter/WithDrawCash"
                        //location.href = "/Mobile/MobileLogin?rturl=" + url;
                        //this.$router.push({path:"/login", query:{rturl:"/withDrawCash"}})
                        this.$toast({
						  	//forbidClick: true,
						  	type: "fail",
						  	message: error.usermsg
						});
                    }

		   		})
		    }
		},
		created(){
			this.getWithDrawCashInfo()
		}
	}	
</script>

<style scoped lang="scss">
	.page-index {
		.header {
			background: #EE580F;
			font-size: 17px;
			/deep/ .van-icon, /deep/ .van-nav-bar__title{
				color: #fff;
			}
		}
		.content {
			margin-top: 46px;
			padding: 0 10px;
			.cell-radio-field{
				/deep/ .van-field__control--custom {
					flex-direction: row-reverse;
				}
			}
			.green{
				color: #3cb926;
				font-size: 18px;
			}
			.btn-submit{
				margin: 30px 0 0;
			}
			.about-user {
			    background-color: #f7efd2;
			    margin: auto;
			    margin-top: 30px;
			    padding: 20px;
			    >h4{
			    	font-size: 16px;
			    	margin-bottom: 10px;
			    }
			    ul>li{
			    	font-size: 14px;
			    }
			}
		}
		.overlay-tips{
			.wrapper{
				display: flex;
			    align-items: center;
			    justify-content: center;
			    flex-direction: column;
			    .tips-content{
			    	width: 94%;
					margin: 0 auto;
					border-radius: 6px;
					.header{
						height: 30px;
						line-height: 29px;
	    				background-color: red;
					}
					.tips{
						padding: 10px 20px 20px;
						background-color: #fff4f3;
						>p{
							line-height: 26px;
							font-size: 13px;
							color: #8f8f94;
						}
					}
				}
			}
			
		}
	}		
</style>