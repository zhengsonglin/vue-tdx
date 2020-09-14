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

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import areaList from '@/assets/js/area'
import utils from '@/utils/utils'

@Component({
  name: 'baseUserInfo',
  components: { },
  created() {
    this.getBaseUserInfo()
  },
  mounted() {
  }
})
export default class BaseUserInfo extends Vue {
  private areaList: any = areaList
  private userBaseInfo: any = {}
  private form: any = {}
  private dialog: any = {
    show: false,
    title: '标题',
    subTitle: '',
    value: '',
    vType: '0',		// 输入类型, 0:文本， 1：整数, 2:密码
    vTypeName: '',	// 如 age, qq, email 等用于confirm后赋值给form
  }
  private showSexPicker: boolean = false	// 性别picker
  private sexColumns: any[] = [{text: '男', value: 0}, {text: '女', value: 1}]
  private showMarryPicker: boolean = false	// 婚姻状况picker
  private marryColumns: any[] = [{text: '已婚', value: 0}, {text: '未婚', value: 1}]
  private showEduPicker: boolean = false  // 教育程度picker
  private eduColumns: any[] = [
    {text: '初中', value: '10806326'}, {text: '高中', value: '10806327'},
    {text: '中专', value: '10806328'}, {text: '大专', value: '10806329'},
    {text: '本科', value: '10806330'}, {text: '研究生', value: '10806331'},
    {text: '博士', value: '10806332'}
  ]
  private showPerTypePicker: boolean = false	// 所属人群picker
  private perTypeColumns: any[] = [
    {text: '宝妈', value: '10806333'}, {text: '全职太太', value: '10806334'},
    {text: '上班', value: '10806336'}, {text: '房产', value: '10806337'},
    {text: '事业单位', value: '10806338'}, {text: '医疗单位', value: '10806339'},
    {text: '白领', value: '10806340'}, {text: '自主经营', value: '10806341'},
  ]
  private showAreaPicker: boolean = false // 所属地区picker
  private selectedArea: any[] = []	// 已选择的所属地区
  
  // methods方法
  public onClickLeft(): void {
    this.$router.back();
  }
  public getFilterNameById(arrayList: any[] = [], filterId: string): string {
    let arr: any[] = arrayList.filter(({value}) => value == filterId)
    return arr.length ? arr[0].text : ''
  }
  public getFilterValueByName(arrayList: any[] = [], filerName: string): string {
    let arr: any[] = arrayList.filter(({text}) => text == filerName)
    return arr.length ? arr[0].value : ''
  }
  // 设置picker的默认选项
  public setDefaultIndex(Columns: any[] = [], value: string): string|number {
    let index: string = ''
    Columns.forEach((item: any, num) => {
      let {cValue, text} = item
      if (value == cValue || value == text) {
        index = num.toString();
        return num
      }
    })
    return index
  }
  // 设置area默认值
  public setAreaDefaultValue(strValue: string, columnNum: number): string {	// columnNum 从1开始，第一列，第二列...
    if (!strValue) { return ''; }
    let arr: any[] = strValue.split('、'), filterAreaObj: any = {}, rKey: string = '';
    
    if (arr.length >= columnNum) {
      let text: string = arr[columnNum - 1];
      if (columnNum == 1) {
        filterAreaObj = areaList.province_list		// 省
      } else if (columnNum == 2) {
        filterAreaObj = areaList.city_list		// 市
      } else if (columnNum == 3) {
        filterAreaObj = areaList.county_list	// 区
      }
      
      // return 
      Object.entries(filterAreaObj).some((item: any, fIndex) => {
        let [key, value] = item
        rKey = key
        return value.includes(text)
      })
      return rKey
    } else {
      return ''
    }
  }
  public parseProvince(province: string): string {
    let spelProvince: string[] = ['北京市', '天津市', '重庆市', '上海市'],
      result = '';
    spelProvince.some((value) => {
      if (value.includes(province)) {
        result = value
      } else {
        result = province + '省'
      }
      return value.includes(province)
    })
    return result
  }
  // 查询用户基本个人信息
  public getBaseUserInfo(): void {
    this.API.getBaseUserInfo().then((result: any) => {
      let {data, error} = result
      this.userBaseInfo = data
      let {create_time, account, gender, age, qq, email, FMarryStaus, marriage, education, crowd, province, city} = data
      let params = {
        registerTime: create_time,
        userName: account,
        sexId: this.getFilterValueByName(this.sexColumns, gender),	// FUserSex,
        sexName: gender,	// this.getFilterNameById(this.sexColumns, FUserSex),
        age,
        qq,
        email,
        marryId: this.getFilterValueByName(this.marryColumns, marriage),	// FMarryStaus,
        marryName: marriage,	// this.getFilterNameById(this.marryColumns, FMarryStaus),
        eduStateId: this.getFilterValueByName(this.eduColumns, education),
        eduStateName: education, 
        perTypeId : this.getFilterValueByName(this.perTypeColumns, crowd),
        perTypeName: crowd,
        area: this.parseProvince(province) + '、' + city + '市',
        province,
        city
      }
      this.form = Object.assign({}, this.form, params)
    })
  }
  // 性别确认
  public onSexConfirm(item: any): void {
    let {value, text} = item
    // console.log(value, text)
    this.form.sexName = text
    this.form.sexId = value
    this.showSexPicker = false
  }
  // 婚姻状况确认
  public onMarryConfirm(item: any): void {
    let {value, text} = item
    this.form.marryName = text
    this.form.marryId = value
    this.showMarryPicker = false
  }
  // 教育程度确认
  public onEduConfirm(item: any): void {
    let {value, text} = item
    this.form.eduStateName = text
    this.form.eduStateId = value
    this.showEduPicker = false
  }
  // 所属人群确认
  public onPerTypeConfirm(item: any): void {
    let {value, text} = item
    this.form.perTypeName = text
    this.form.perTypeId = value
    this.showPerTypePicker = false
  }
  public handleConfirm(dialog: any): void {
    console.log(this.dialog, dialog)
    let {vTypeName, value} = dialog
    this.form[vTypeName] = value
  }
  public onDialogClosed(): void {
    this.dialog.title = '标题'
    this.dialog.vType = '0'
    this.dialog.value = ''
    this.dialog.show = false
  }
  public beforeClose(action: any, done: any): void {
    // console.log(2233, action)
    if (action == 'cancel') {
      done();
      return
    }
    if (action == 'confirm') {
      if (utils.isNotEmpty(this.dialog.value)) {
        this.handleConfirm({...this.dialog})
        done()
      } else {
        // this.$toast(this.dialog.title)
        this.$notify({ type: 'primary', message: this.dialog.title });
        done(false)
      }
    }
  }
  public openDialog(vTypeName: string): void {
    if (vTypeName == 'age') {
      this.dialog.title = '请输入您的年龄'
      this.dialog.vType = '1'
    } else if (vTypeName == 'qq') {
      this.dialog.title = '请输入您的QQ'
      this.dialog.vType = '1'
    } else if (vTypeName == 'email') {
      this.dialog.title = '请输入您的邮箱'
      this.dialog.vType = '0'
    } else if (vTypeName == 'pass') {
      this.dialog.title = '请输入您的密码'
      this.dialog.vType = '2'
    }
    this.dialog.vTypeName = vTypeName
    this.dialog.value = this.form[vTypeName]
    this.dialog.show = true
  }
  // value=0改变省，1改变市，2改变区
  public onAreaChange(picker: any, index: number, value: string): void {
      let val: any = picker.getValues();
      let areaName: string = ''
      for (let i = 0; i < val.length; i++) {
          areaName = areaName + (i == 0 ? '' : '/') + val[i].name
      }
  }
  // 确定选择开户地区
  public onAreaConfirm(pItem: any, indexArray: any): void {
    // console.log(pItem)
      this.form.area = pItem[0].name + '、' + pItem[1].name;
      this.selectedArea = [...pItem]
      this.showAreaPicker = false// 关闭弹框
  }
  // 取消选中城市
  public onAreaCancel(): void {
       this.showAreaPicker = false
       let myAreaEl: any = this.$refs.myArea;
       myAreaEl.reset()// 重置城市列表
  }
  public submit(): void {
    // { sex: sex, age: age, qq: qq, email: email, hf: hf, edu: edu, belon: belon, province: province, city: city },
  
    let { sexId, sexName, age, qq, email, marryName, eduStateName, perTypeName, province, city } = this.form
    
    if (this.selectedArea.length) {
      province = this.selectedArea[0].name.slice(0, -1),	// 如湖北省不能带上“省”
      city = this.selectedArea[1].name.slice(0, -1);	// 如武汉市不能带上“市”
    }
    let params: any = {
      gender: sexName, age, qq, email,
      marriage: marryName,
      education: eduStateName,
      crowd: perTypeName,
      province,
      city
    }
    // console.log(params)
    this.API.setBaseUserInfo(params).then((result: any) => {
      let {data, error} = result
      if (error.errno == 200) {
              this.$toast({
                duration: 600, // 持续展示 toast
            forbidClick: true,
            type: 'success',
            message: '设置成功',
            onClose: () => {this.$router.back()}
        });
            
          } else if (error.errno == 101) {
              this.$toast({
            // forbidClick: true,
            type: 'fail',
            message: error.usermsg
        });
          } else {
              // var url = "/MobileUserCenter/BaseUserInfo";
              // location.href = "/MobileUserCenter/UserCenter?rturl=" + url;
              // this.$router.push({path:"/login", query:{rturl:"/baseUserInfo"}})
              this.$toast({
            // forbidClick: true,
            type: 'fail',
            message: error.usermsg
        });
          }
    })
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