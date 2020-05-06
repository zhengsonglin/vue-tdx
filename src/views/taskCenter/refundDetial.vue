<template>
	<div class="page-index bg-fff h100 over-auto refundDetial">
		<div class="header-wrap">
			<van-nav-bar title="申请售后" left-text="" right-text="" left-arrow fixed z-index="10" class="header" @click-left="onClickLeft"></van-nav-bar>	
		</div>
		<div class="content">
			<div class="item-info">
				<div class="left-img h100" @click="imagePreview">
					<img :src="refundBaseInfo.FIMGUrl" class="w100 h100"/>					
				</div>
				
				<div class="right-word">
					<div class="van-ellipsis right_word_tit">{{refundBaseInfo.FGoodsName}}</div>
	                <div class="item-sku">ssadsa阿斯顿撒萨达121</div>
	            </div>
			</div>
			
			<div class="form-group">
				<div class="cell-row bottom-line">
					<van-field readonly :value="form.value" label="售后原因" placeholder="" is-link @click="showPicker = true"/>
					<van-popup v-model="showPicker" position="bottom">
					  	<van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
					</van-popup>
				</div>
				<div class="cell-row bottom-line">
					<van-field v-model="form.remark" label="售后说明" placeholder="请填写售后说明"/>
				</div>
				<div class="cell-row bottom-line">
					<van-field name="uploader" label="售后凭证">
						<template #input>
						    <van-uploader v-model="fileList" :after-read="afterRead" multiple :max-count="3" accept="image/png, image/jpeg"/>
						</template>
					</van-field>
				</div>
			</div>	
			
			<div class="btn-group">	
				<van-button block  color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="submit" >提交</van-button>
			</div>	
		</div>
	</div>	
</template>

<script>
	import { ImagePreview } from 'vant';
	export default {
		name: 'refundDetial',
		components: {
		    [ImagePreview.Component.name]: ImagePreview.Component,
		},
		data() {
			return {
				refundBaseInfo: {},
				form: {},
				query:{},
				showPicker:false,
				columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
				fileList: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
			}
		},
		methods: {
			onClickLeft() {
				this.$router.back();
			},
			getTaskByFID(){
				this.API.getTaskByFID(this.query).then((data)=>{
					this.refundBaseInfo = data
				})
			},
			afterRead(file) {
		      	// 此时可以自行将文件上传至服务器
		      	console.log(file);
		      	
		    },
		    imagePreview(){
		    	if(this.refundBaseInfo.FIMGUrl){
			    	ImagePreview({
					  	images: [this.refundBaseInfo.FIMGUrl],
						closeable: true,
						showIndex:false
			    	});
				}
		    },
			onConfirm(value){
				this.form.value = value;
				this.showPicker = false
			},
			submit(){
				
			}
		},
		created(){
			let {TaskID, SalesID, taskType} = this.$route.query;
			this.query = {fid: TaskID, type: taskType}
			this.getTaskByFID()
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
			padding: 10px;
			.item-info{
				display: flex;
				flex-direction: row;
				height:96px;
				align-items: center;
				padding:10px;
				box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
				margin-top:10px;
				
				.left-img{
					width: 34%;
					flex-basis: 34%;
				}
				.right-word{
					width: 66%;
					flex-basis: 66%;
					font-size: 14px;
					padding-left: 20px;
					box-sizing: border-box;
					line-height: 30px;
					.right_word_tit{
						color: #3d4245;
					}
					.item-sku{
						color: #999;
						font-size: 13px;
					}
				}
			}
			.form-group{
				margin-top: 10px;
				box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
			}
			.btn-group{
				margin-top: 30px;
			}
		}
	}
</style>