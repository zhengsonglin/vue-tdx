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
	                <div class="item-sku">测试测试</div>
	            </div>
			</div>
			
			<div class="form-group">
				<div class="cell-row bottom-line">
					<van-field readonly :value="form.reason" label="售后原因" placeholder="" is-link @click="showPicker = true"/>
					<van-popup v-model="showPicker" position="bottom">
					  	<van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
					</van-popup>
				</div>
				<div class="cell-row bottom-line" v-if="form.reason =='差价售后' || refundBaseInfo.RefundReason =='资金问题'">
					<van-field v-model="form.money" label="实拍金额" type="number" placeholder="请填写实拍金额">
						<template #right-icon>元</template>
					</van-field>
					
					<div class="return_rea_left text-r" style="margin-top:3px;color:darkgray;">
	                	（ 任务金额：￥<span id="rwje" style="margin-right: 20px;">{{toDecimal2(refundBaseInfo.YPrice)}}</span>差价金额：<span id="RefundMoney">{{refundBaseInfo.DiffAmount || 0}}</span> ）
	            	</div>
				</div>
				<div class="cell-row bottom-line">
					<van-field v-model="form.remark" label="售后说明" placeholder="请填写售后说明"/>
				</div>
				
				

				<div class="cell-row bottom-line" v-if="form.reason =='差价售后' || refundBaseInfo.RefundReason =='资金问题'">
					<van-field name="tpsm" type="textarea" rows="2" readOnly label="售后凭证" 
						placeholder="售后凭证">
						<template #input>
							<div style="color:red;margin-top: -10px;">（请提供淘宝付款截图：包含店铺名，付款金额及订单号）</div>
						</template>
					</van-field>
				</div>
				
				<div class="cell-row bottom-line">
					<van-field name="uploader" label=" ">
						<template #input>
						    <van-uploader v-model="fileList" :before-read="beforeRead" :after-read="afterRead" multiple :max-count="3" accept="image/png, image/jpeg, image/jpg"
						    	:max-size="3 * 1024 * 1024" @oversize="onOversize" @delete="deletePreview"/>
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

<script lang="ts">
	import {Component, Vue, Prop, Watch, Emit } from "vue-property-decorator"
	import { ImagePreview } from 'vant';
	@Component({
		name: 'refundDetial',
		components: {
			[ImagePreview.Component.name]: ImagePreview.Component //ImagePreview
		},
		// 生命周期, 也可以写在下面的组件方法中，组件中的生命周期方法会覆盖当前的生命周期方法
		created(){
			let {TaskID, SalesID, taskType} = this.$route.query;
			this.query = {fid: TaskID, type: taskType}
			this.getTaskByFID()
		}
	})
	export default class RefundDetial extends Vue {
		private refundBaseInfo: any = {}
		private form: any = {}
		private query: any = {}
		private showPicker: boolean = false
		private columns: string[] = ['差价售后', '资金问题', '物流问题', '礼品问题']
		private fileList: any = [
		    /*{
		      url: 'https://img.yzcdn.cn/vant/leaf.jpg',
		      status: 'uploading',
		      message: '上传中...',
		    },
		    {
		      url: 'https://img.yzcdn.cn/vant/tree.jpg',
		      status: 'failed',
		      message: '上传失败',
		    },*/
		    
		]
		private resultImgs: any = {}	//已经上传好的图片路径
		private fileId: number = 0
		
		//methods方法
		onClickLeft(): void {
			this.$router.back();
		}
		getTaskByFID(): void {
			this.API.getTaskByFID(this.query).then((data: any)=>{
				this.refundBaseInfo = data
				let {YPrice, DiffAmount} = data
				this.form.money = DiffAmount?(parseFloat(YPrice) + parseFloat(DiffAmount)):parseFloat(YPrice)
				
				 if(data.UserType=="粉丝"){
		            if(data.RefundReason=="资金问题"){
		                this.form.tpsm = "（请提供淘宝付款截图：包含店铺名，付款金额及订单号）" ;
		            }
		            if(data.RefundReason=="物流问题"){
		                this.form.tpsm = "（请提供物流状态截图）" ;
		            }
		            if(data.RefundReason=="礼品问题"){
		                this.form.tpsm = "（请提供物流面单及实收产品图）" ;
		            }
		        }
			})
		}
		validImgFile(file: any, index?: number): boolean {
			if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
				if(index){
					this.$toast('上传的第'+index+'图片格式不正确, 已经自动过滤');
				}else{
					this.$toast('上传的图片格式不正确');
				}
				file.validStatus = false
		    	file.validSText = "图片格式不正确"
		        return false;
		    }else if(file.size > 8000){//3 * 1024 * 1024
		    	if(index){
		    		this.$toast("第"+index+'张图片文件过大, 已经自动过滤');
		    	}else{
		    		this.$toast('上传图片文件过大');
		    	}
		    	file.validStatus = false
		    	file.validSText = "图片文件过大"
		        return false;
		    }
		    file.validStatus = true
		    return true;
		}
		//上传前校验
		beforeRead(file: any): boolean {
			if(Array.isArray(file)){
				let flag = false	//只要有一张图片符合要求就要上传， 不符合要求全部过滤
				file.forEach((cFile, index)=>{
					cFile.fileId = ++this.fileId 
					let b = this.validImgFile(cFile, index+1)
					flag = flag || b
				})
				return flag
			}else{
				file.fileId = ++this.fileId 
				return this.validImgFile(file)
			}
		}
		//通过max-size属性可以限制上传文件的大小，超过大小的文件会被自动过滤，这些文件信息可以通过oversize事件获取
		onOversize(file: any): void {
		  	console.log(file);
		}
		//目前是一次上传一张，分多次上传， 如果已上传多张(multiple时)， 这里为数组需额外处理
		afterRead(file: any): void {
			console.log(this.fileList)
			if(Array.isArray(file)){
				let fileList = this.fileList.filter((item: any)=> item.file.validStatus);
				this.fileList = fileList
				
				let hFile = file.filter((item)=> item.file.validStatus);
				
				hFile.forEach((item: any)=>{
					this.uploadEachImg(item)
				})
			}else{
				this.uploadEachImg(file)
			}
		}
		uploadEachImg(file: any): void {
			// 此时可以自行将文件上传至服务器
			//console.log(file);
			file.status = 'uploading';
			file.message = '上传中...';
		
			this.API.uploadRefundImg(file, {showLoading:false}).then((data: any)=>{
				if(data.ErrorCode==100){
					file.status = 'done';
					file.message = '上传成功';
					//file.url = "http://119.27.182.166:83"+data.Content	//设置无效
					//成功地址："http://119.27.182.166:83"+data.Content
					let key = "key_"+file.file.fileId
					this.resultImgs[key] = "http://119.27.182.166:83"+data.Content
				}else {
					file.status = 'fail';
					file.message = '上传失败';
				}
			})
		}
		//预览图片
		imagePreview(): void {
			if(this.refundBaseInfo.FIMGUrl){
		    	ImagePreview({
				  	images: [this.refundBaseInfo.FIMGUrl],
					closeable: true,
					showIndex:false
		    	});
			}
		}
		//删除预览
		deletePreview(file: any, item: any): void {
			let {name, index} = item
			let key = "key_" + file.file.fileId
			delete this.resultImgs[key]
		}
		onConfirm(value: any): void {
			this.form.reason = value;
			this.showPicker = false
		}
		submit(): void {
			this.$toast("逻辑太多，不确定参数复杂，写不动了")
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