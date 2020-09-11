<template>
	<div class="page-index bg-fff h100 over-auto uploadScreenShot">
		<div class="header-wrap">
			<van-nav-bar title="好评截图" left-text="" right-text="" left-arrow fixed z-index="10" class="header" @click-left="onClickLeft">
				<template #right>
					<van-icon name="replay" size="20" style="margin-right: 15px;" @click="refresh"/>
				    <van-icon name="edit" size="20" @click="forceEdit" v-if="!allowEdit" />
				    <!--FStatus == 27时修改好评截图) -->
				    <van-icon name="success" size="20" v-if="allowEdit" @click="submit"/>
				</template>
			</van-nav-bar>	
		</div>
		<div class="content">
			<h3 class="tips" v-if="uploadInfo.FGoodsObjectID == 25 && uploadInfo.SlideShow == 1">提示：本任务需要在评价中晒图</h3>
			<p class="error red" v-if="uploadInfo.Content != '' && uploadInfo.FStatus == 2">商家驳回原因： {{uploadInfo.Content}} </p>
			
			<div class="form-group">
				<div class="cell-row bottom-line">
					<div class="cell-title">买家旺旺：</div>
					<div class="cell-content"><input type="text" v-model.trim="form.txt_wangwang" class="w100" :readonly="!allowEdit"/></div>
				</div>
				<div class="cell-row bottom-line">
					<div class="cell-title">订单号码：</div>
					<div class="cell-content"><input type="text" v-model.trim="form.txt_ordernum" class="w100" :readonly="!allowEdit"/></div>
				</div>
				<div class="cell-row" v-if="allowEdit">
					<div class="cell-title">好评截图：</div>
					<div class="cell-content text-r">
						<van-uploader v-model="fileList" :preview-image="false" :after-read="afterRead">
						  	<van-button icon="photo" color="linear-gradient(to right, #4bb0ff, #6149f6)" size="small">点击上传图片</van-button>
						</van-uploader>
					</div>
				</div>
				<div class="cell-row">
					<img :src="singleFile.content" width="100%"/>
					<!--<img :src="uploadInfo.img[0]" width="100%"/>-->
				</div>	
			</div>
		</div>
	</div>	
</template>

<script lang="ts">
	import {Component, Provide, Vue, Watch, Emit } from "vue-property-decorator"
	import utils from "@/utils/utils"
	@Component({
		name: 'uploadScreenShot',
		components: {},
		// 生命周期, 也可以写在下面的组件方法中，组件中的生命周期方法会覆盖当前的生命周期方法
		created(){
			this.taskId = this.$route.query.TaskId;
			this.getUploadInfo()
		}
	})
	export default class UploadScreenShot extends Vue {
		//data属性
		private taskId: string = ""	//编辑才存在
		private uploadInfo: any = {}
		private fileList: any[] = []	//需要上传的图片集合
		private singleFile: any = {}	//单个图片
		private form: any = {}
		private dz : string = "0"
		private clickStatus: number = 0	//防止用户连续点击导致重复上传
		private isForceEdit: boolean = false	//是否强制编辑
		
		//computed计算属性
		get allowEdit(): boolean {
			//未提交好评截图， 或者好评截图不通过需要修改
			return this.isForceEdit || this.uploadInfo.FStatus == 2 || this.uploadInfo.FStatus == 27
		}
		//methods方法
		onClickLeft(): void {
			this.$router.back();
		}
		refresh(): void {
			this.isForceEdit = false
			this.fileList = [];
			this.singleFile = {};
			this.getUploadInfo()
		}
		afterRead(file: any): void {
		  	// 此时可以自行将文件上传至服务器
		  	console.log(file);
		  	//console.log(this.fileList)
		  	this.singleFile = file
		  	this.form.File1 = file.file
		}
		submit(): void {
			let {txt_wangwang, txt_ordernum} = this.form
			if(!utils.isNotEmptyAll(txt_wangwang, txt_ordernum)){
				this.$toast("请同时填写好买家旺旺和订单编号！")
				return;
			}else if(this.fileList.length==0){
				this.$toast("请上传订单好评截图！")
				return;
			}
			if (this.dz == "1") {
				this.$dialog.confirm({
					title:"提示",
					message:"此任务为定制评价,确定评价与商家要求一致？"
				}).then(()=>{
					this.hWUploadScreenShots()
				})
		    }else{
		    	this.hWUploadScreenShots()
		    }
		}
		hWUploadScreenShots(): void {
			this.form.TaskId = this.taskId
			if(this.clickStatus != 1){
				this.clickStatus = 1;
				this.isForceEdit = false
				this.API.hWUploadScreenShots(this.form).then((data: any)=>{
					this.clickStatus = 0;
					if (data.ErrorCode == 100) {
		                this.$toast({
		                	duration: 600, // 持续展示 toast
						  	forbidClick: true,
						  	type: "success",
						  	message: '绑定成功',
						  	onClose:()=>{this.$router.back()}
						});
		            } else if (data.ErrorCode == 101) {
		            	this.$toast({
						  	//forbidClick: true,
						  	type: "fail",
						  	message: data.Content
						});
		            } else {
		                this.$router.push("login")
		            }
				})
			}
		}
		getUploadInfo(): void {
			this.API.getUploadInfo({id: this.taskId, type:3}).then((data: any)=>{
				this.uploadInfo = data
				this.form = Object.assign({}, this.form, {txt_wangwang:data.user_ww, txt_ordernum:data.order_sn })
				
				this.$set(this.singleFile, "content",  data.img[0])
				
				return
				if (data.FStatus != 2) {
					if (data.FPingJiastatus == 0) {
		                this.singleFile.content = data.FWellReceivedScreenshots
		            } else {
		                this.dz = "1";
		                this.singleFile.content = data.FPingJiaImg
		            }
		        }else if (data.FPingJiastatus > 0 ) {
					this.dz = "1";
				}
			})
		}
		forceEdit(): void {
			this.$dialog.confirm({
			  title: '编辑',
			  message: '你确定要强制编辑吗?',
			}).then(() => {
			    this.isForceEdit = true
			}).catch(() => {});
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
			.red{
				color: red;
			}
			h3.tips, p.error{
				font-size: 18px;
    			padding: 20px 20px 0;
			}
			
			.form-group{
				padding: 10px 0;
				font-size: 16px;
				.cell-row{
					display: flex;
					flex-direction: row;
					align-items: center;
				    padding: 10px 20px 10px;
				    box-sizing: border-box;
				    &.bottom-line{
				    	border-bottom: 1px solid #eee;
				    }
					.cell-title{
						width: 90px;
						flex-basis: 90px;
					}
					.cell-content{
						flex: 1;
						width: 0;
						input{
							height: 40px;
							border: 1px solid #ddd;
							outline: none;
							border-radius: 6px;
							background: #f9f9f9;
							padding: 0px 10px;
    						box-sizing: border-box;
						}
					}
				}
			}
		}
	}
</style>