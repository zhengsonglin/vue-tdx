<template>
	<div class="page-index bg-fff h100 over-auto baseUserInfo">
		<div class="header-wrap">
			<van-nav-bar title="个人基本资料" left-text="" right-text="" left-arrow fixed z-index="10" class="header" @click-left="onClickLeft" />
		</div>
		<div class="content">
			<van-cell-group class="cell-group">
				<van-cell title="注册时间" :value="moment(form.registerTime).format('YYYY-MM-DD HH:mm:ss')" />
  				<van-cell title="用户名" :value="form.userName" />

				<van-cell title="性别" is-link :value="form.sexName" @click="showSexPicker = true"/>
				<van-popup v-model="showSexPicker" position="bottom">
				  	<van-picker show-toolbar :columns="sexColumns" :default-index="setDefaultIndex(sexColumns, form.sexName)" @cancel="showSexPicker = false" @confirm="onSexConfirm" />
				</van-popup>
				
				<van-cell title="年龄" is-link :value="form.age" @click="openDialog('age')"/>
				<van-cell title="QQ号码" is-link :value="form.qq" @click="openDialog('qq')"/>
				<van-cell title="我的邮箱" is-link :value="form.email" @click="openDialog('email')"/>
				
				<van-cell title="婚姻状况" is-link :value="form.marryName" @click="showMarryPicker = true"/>
				<van-popup v-model="showMarryPicker" position="bottom">
				  	<van-picker show-toolbar :columns="marryColumns" @cancel="showMarryPicker = false" @confirm="onMarryConfirm" />
				</van-popup>
				
				<van-cell title="教育程度" is-link :value="form.eduStateName" @click="showEduPicker = true"/>
				<van-popup v-model="showEduPicker" position="bottom">
				  	<van-picker show-toolbar :columns="eduColumns" :default-index="setDefaultIndex(eduColumns, form.eduStateName)" @cancel="showEduPicker = false" @confirm="onEduConfirm" />
				</van-popup>
				
				<van-cell title="所属人群" is-link :value="form.perTypeName" @click="showPerTypePicker = true"/>
				<van-popup v-model="showPerTypePicker" position="bottom">
				  	<van-picker show-toolbar :columns="perTypeColumns" :default-index="setDefaultIndex(perTypeColumns, form.perTypeName)" @cancel="showPerTypePicker = false" @confirm="onPerTypeConfirm" />
				</van-popup>
				
				<van-cell title="所属地区" is-link :value="form.area" @click="showAreaPicker = true"/>
				<van-popup v-model="showAreaPicker" position="bottom" >
				    <van-area :area-list="areaList" :value="setAreaDefaultValue(form.area, 2)" :columns-num="2" ref="myArea" title="开户地区" @change="onAreaChange" @confirm="onAreaConfirm" @cancel="showAreaPicker=false"/>
				</van-popup>
			</van-cell-group>
			
			<div class="btn-group">
				<van-button block round color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="submit" >提交</van-button>
			</div>
			
			<van-dialog v-model="dialog.show" :title="dialog.title" show-cancel-button  @closed="onDialogClosed" :beforeClose="beforeClose"><!--@open="onDialogOpen"-->
				<!--<div class="sub-title text-c">{{dialog.subTitle}}</div>-->
			  	<div class="input-item text-input text-c">
					<!--<input type="text"  v-model="dialog.value" placeholder="" v-if="dialog.vType==0" class="text">
					<input type="digit"  v-model="dialog.value" placeholder="" v-if="dialog.vType==1" class="digit">
					<input type="password"  v-model="dialog.value" placeholder="" v-if="dialog.vType==2" class="pass">-->
					<van-field v-model="dialog.value" type="text" placeholder="" v-if="dialog.vType==0" class="text"/>
					<van-field v-model="dialog.value" type="digit" placeholder="" v-if="dialog.vType==1" class="digit"/>
					<van-field v-model="dialog.value" type="password" placeholder="" v-if="dialog.vType==2" class="pass"/>
				</div>
			</van-dialog>
		</div>
	</div>	
</template>

<script>
	import areaList from 'assets/js/area.js'
	import utils from "@/utils/utils"
	export default {
		name: 'baseUserInfo',
		data() {
			return {
				areaList,
				userBaseInfo: {},
				form:{},
				dialog:{
					show: false,
					title: "标题",
					subTitle:"",
					value:"",
					vType:"0",		//输入类型, 0:文本， 1：整数, 2:密码
					vTypeName:"",	//如 age, qq, email 等用于confirm后赋值给form
				},
				showSexPicker:false,	//性别picker
				sexColumns:[{text:"男", value:0},{text:"女", value:1}],
				showMarryPicker:false,	//婚姻状况picker
				marryColumns:[{text:"已婚", value:0},{text:"未婚", value:1}],
				showEduPicker: false,  //教育程度picker
				eduColumns: [
					{text:"初中", value:'10806326'},{text:"高中", value:"10806327"},
					{text:"中专", value:'10806328'},{text:"大专", value:"10806329"},
					{text:"本科", value:'10806330'},{text:"研究生", value:"10806331"},
					{text:"博士", value:'10806332'}
				],
				showPerTypePicker: false,	//所属人群picker
				perTypeColumns: [
					{text:"宝妈", value:'10806333'},{text:"全职太太", value:'10806334'},
					{text:"上班", value:'10806336'},{text:"房产", value:'10806337'},
					{text:"事业单位", value:'10806338'},{text:"医疗单位", value:'10806339'},
					{text:"白领", value:'10806340'},{text:"自主经营", value:'10806341'},
				],
				showAreaPicker: false, //所属地区picker
				selectedArea:[],	//已选择的所属地区

			}
		},
		methods: {
			onClickLeft() {
				this.$router.back();
			},
			getFilterNameById(arrayList =[], filterId){
				let arr = arrayList.filter(({value})=>value == filterId)
				return arr.length?arr[0].text:""
			},
			getFilterValueByName(arrayList =[], filerName){
				let arr = arrayList.filter(({text})=>text == filerName)
				return arr.length?arr[0].value:""
			},
			//设置picker的默认选项
			setDefaultIndex(Columns =[], value){
				let index = ""
				Columns.forEach(({cValue, text}, num)=>{
					if(value == cValue || value == text){
						index = num;
						return num
					}
				})
				return index
			},
			//设置area默认值
			setAreaDefaultValue(strValue, columnNum){	//columnNum 从1开始，第一列，第二列...
				if(!strValue) return "";
				let arr = strValue.split("、"), filterAreaObj = {}, rKey="";
				
				if(arr.length>=columnNum){
					let text = arr[columnNum-1];
					if(columnNum == 1){
						filterAreaObj = areaList.province_list		//省
					}else if(columnNum == 2){
						filterAreaObj = areaList.city_list		//市
					}else if(columnNum == 3){
						filterAreaObj = areaList.county_list	//区
					}
					
					//return 
					Object.entries(filterAreaObj).some(([key, value], fIndex)=>{
						rKey = key
						return value.includes(text)
					})
					return rKey
				}else{
					return ""
				}
			},
			parseProvince(province){
				let spelProvince = ["北京市", "天津市", "重庆市", "上海市"],
					result = "";
				spelProvince.some((value)=> {
					if(value.includes(province)){
						result = value
					}else{
						result = province+"省"
					}
					return value.includes(province)
				})
				return result
			},
			//查询用户基本个人信息
			getBaseUserInfo(){
				this.API.getBaseUserInfo().then((data)=>{
					this.userBaseInfo = data
					let {FTime, FUserName, FUserSex, FAge, FUserQQ, FEmailAddress, FMarryStaus, FEduStautsName, FBelongManName, FProvince, FCity} = data
					let params = {
						registerTime:FTime,
						userName: FUserName,
						sexId: FUserSex,
						sexName: this.getFilterNameById(this.sexColumns, FUserSex),
						age: FAge,
						qq: FUserQQ,
						email: FEmailAddress,
						marryId: FMarryStaus,
						marryName: this.getFilterNameById(this.marryColumns, FMarryStaus),
						eduStateId: this.getFilterValueByName(this.eduColumns, FEduStautsName),
						eduStateName: FEduStautsName, 
						perTypeId : this.getFilterValueByName(this.perTypeColumns, FBelongManName),
						perTypeName: FBelongManName,
						area: this.parseProvince(FProvince)+"、"+FCity+"市",
						province: FProvince,
						city: FCity
					}
					this.form = Object.assign({}, this.form, params)
				})
			},
			//性别确认
			onSexConfirm({value, text}){
				//console.log(value, text)
				this.form.sexName = text
				this.form.sexId = value
				this.showSexPicker = false
			},
			//婚姻状况确认
			onMarryConfirm({value, text}){
				this.form.marryName = text
				this.form.marryId = value
				this.showMarryPicker = false
			},
			//教育程度确认
			onEduConfirm({value, text}){
				this.form.eduStateName = text
				this.form.eduStateId = value
				this.showEduPicker = false
			},
			//所属人群确认
			onPerTypeConfirm({value, text}){
				this.form.perTypeName = text
				this.form.perTypeId = value
				this.showPerTypePicker = false
			},
			handleConfirm(dialog){
				console.log(this.dialog, dialog)
				let {vTypeName, value} = dialog
				this.form[vTypeName] = value
			},
			onDialogClosed(){
				this.dialog.title = "标题"
				this.dialog.vType = "0"
				this.dialog.value = ""
				this.dialog.show = false
			},
			beforeClose(action, done){
				//console.log(2233, action)
				if(action == "cancel"){
					done();
					return
				}
				if(action == "confirm"){
					if(utils.isNotEmpty(this.dialog.value)){
						this.handleConfirm({...this.dialog})
						done()
					}else{
						//this.$toast(this.dialog.title)
						this.$notify({ type: 'primary', message: this.dialog.title });
						done(false)
					}
				}
			},
			openDialog(vTypeName){
				
				if(vTypeName == 'age'){
					this.dialog.title = "请输入您的年龄"
					this.dialog.vType = "1"
				}else if(vTypeName == 'qq'){
					this.dialog.title = "请输入您的QQ"
					this.dialog.vType = "1"
				}else if(vTypeName == 'email'){
					this.dialog.title = "请输入您的邮箱"
					this.dialog.vType = "0"
				}else if(vTypeName == 'pass'){
					this.dialog.title = "请输入您的密码"
					this.dialog.vType = "2"
				}
				this.dialog.vTypeName = vTypeName
				this.dialog.value = this.form[vTypeName]
				this.dialog.show = true
			},
			//value=0改变省，1改变市，2改变区
	        onAreaChange(picker, index, value){
	            let val = picker.getValues();
	            let areaName = ''
	            for (var i = 0; i < val.length; i++) {
	                areaName = areaName+(i==0?'':'/')+val[i].name
	            }
	        },
	        //确定选择开户地区
	        onAreaConfirm(pItem, indexArray){
	        	//console.log(pItem)
	            this.form.area = pItem[0].name+"、"+pItem[1].name;
	            this.selectedArea = [...pItem]
	            this.showAreaPicker = false//关闭弹框
	            
	        },
	        //取消选中城市
	        onAreaCancel(){
	             this.showAreaPicker = false
	             this.$refs.myArea.reset()// 重置城市列表
	        },
	        submit(){
	        	//{ sex: sex, age: age, qq: qq, email: email, hf: hf, edu: edu, belon: belon, province: province, city: city },

	        	let { sexId, age, qq, email, marryId, eduStateId, perTypeId, province, city } = this.form
				
	        	if(this.selectedArea.length){
	        		province = this.selectedArea[0].name.slice(0, -1),	//如湖北省不能带上“省”
	        		city = this.selectedArea[1].name.slice(0, -1);	//如武汉市不能带上“市”
	        	}
	        	let params = {
	        		sex:sexId, age, qq, email,
	        		hf: marryId,
	        		edu: eduStateId,
	        		belon: perTypeId,
	        		province,
	        		city
	        	}
	        	//console.log(params)
	        	this.API.setBaseUserInfo(params).then((data)=>{
	        		if (data.ErrorCode = 100) {
                        this.$toast({
                        	duration: 600, // 持续展示 toast
						  	forbidClick: true,
						  	type: "success",
						  	message: '设置成功',
						  	onClose:()=>{this.$router.back()}
						});
                      
                    } else if (data.ErrorCode = 101) {
                        this.$toast({
						  	//forbidClick: true,
						  	type: "fail",
						  	message: data.Content
						});
                    } else {
                        //var url = "/MobileUserCenter/BaseUserInfo";
                        //location.href = "/MobileUserCenter/UserCenter?rturl=" + url;
                        this.$router.push({path:"/login", query:{rturl:"/baseUserInfo"}})
                    }

	        	})
	        }
		},
		created(){
			this.getBaseUserInfo()
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
			/deep/ .van-dialog{
				.input-item{
					margin: 30px 0;
					.van-cell{
					    border: 1px solid rgba(0, 0, 0, .2);
					    margin: 0 20px;
					    width: auto;
					    border-radius: 6px;
					}
					/*>input{
						height: 38px;
						width: 80%;
						border: 1px solid rgba(0, 0, 0, .2);
					    border-radius: 6px;
					    outline: none;
					    background-color: #fff;
					    -webkit-appearance: none;
					    text-indent: 6px;
					}*/
				}
			}
			.btn-group{
				margin-top: 30px;
			}
		}
	}
</style>