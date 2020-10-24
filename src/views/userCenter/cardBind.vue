<template>
    <div class="page-index bg-fff h100 over-auto cardBind">
        <div class="header-wrap">
            <van-nav-bar title="绑定银行卡" left-text="" right-text="" left-arrow fixed z-index="10" class="header"
                         @click-left="onClickLeft">
                <template #right>
                    <van-icon name="replay" size="18" style="margin-right: 15px;" @click="getUserInfo"/>
                    <van-icon name="edit" size="18" @click="forceEdit" v-if="showEdit"/>
                </template>
            </van-nav-bar>
        </div>
        <div class="content" v-show="userInfo.account">
            <van-cell-group :class="['cell-group', {'finished':isDisabled}]">
                <van-field v-model="form.phone" type="tel" label="手机号码" placeholder="手机号码" :readonly="isDisabled"/>
                <van-field v-model="form.yzm" type="digit" center clearable label="手机验证码" placeholder="请输入短信验证码"
                           maxlength="6" v-if="!isDisabled">
                    <template #button v-if="!isDisabled">
                        <van-button type="primary" @click="sendCode" size="small" :disabled="validCode.isDisabled">
                            {{validCode.btnText}}
                        </van-button>
                    </template>
                </van-field>

                <van-field v-model="form.reallyName" label="真实姓名" placeholder="真实姓名" :readonly="isDisabled"/>
                <van-field readonly label="开户银行" :value="form.bankName" placeholder="选择开户银行"
                           @click="showBankPicker = !isDisabled"
                           :is-link="!isDisabled"/>
                <van-popup v-model="showBankPicker" position="bottom">
                    <van-picker show-toolbar title="开户行" :columns="columns" @cancel="showBankPicker = false"
                                @confirm="onBankConfirm"/>
                </van-popup>

                <van-field readonly label="开户地区" :value="form.area" placeholder="选择开户地区"
                           @click="showAreaPicker = !isDisabled"
                           :is-link="!isDisabled"/>
                <van-popup v-model="showAreaPicker" position="bottom">
                    <van-area :area-list="areaList" :columns-num="2" ref="myArea" title="开户地区" @change="onAreaChange"
                              @confirm="onAreaConfirm" @cancel="onAreaCancel"/>
                </van-popup>
                <van-field v-model="searchKey" type="tel" label="开户支行" placeholder="开户支行关键词搜索" :readonly="isDisabled"
                           v-if="!isDisabled">
                    <template #button v-if="!isDisabled">
                        <van-button plain size="small" color="#7232dd" @click="getSubBranch(true)">搜索</van-button>
                    </template>
                </van-field>

                <div class="subBranch" v-if="!isDisabled">
                    <select class="select-subBranch" v-model="form.subBranchID">
                        <option :value="item.SubBranchID" v-for="(item, index) in subBranchList" :key="index">{{item.SubBranchLName}}
                        </option>
                    </select>
                </div>
                <van-field v-model="form.subBankName" label="开户支行" placeholder="开户支行" :readonly="isDisabled"
                           v-if="isDisabled"/>

                <van-field v-model.trim="form.bankNum" type="digit" label="银行卡号" placeholder="银行卡号"
                           :readonly="isDisabled"/>

                <div class="card_bind_item c-fff" v-if="isDisabled">银行卡卡主姓名必须和实名认证姓名一致，否则无法正常提现返款</div>

                <div class="card_bind_item c-fff" v-if="!isDisabled">
                    <p>根据开户银行选择对应的开户支行，如若找不到对应的支行名称请联系平台客户</p>
                    <a class="concat" @click="concatCus">联系平台客服</a>
                </div>

                <div class="card_bind_item c-fff" v-if="isDisabled">
                    <p class="card_bind_item_word">对不起! 您的账户已绑定银行卡，如需更改银行卡信息，请联系客服处理！</p>
                    <a class="concat" @click="concatCus">联系平台客服</a>
                </div>

            </van-cell-group>


            <div class="btn-group" v-if="!isDisabled">
                <van-button block round color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="submit">提交
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import areaList from 'assets/js/area.js'
    import utils from "@/utils/utils"
    import {checkMobilePhone} from 'assets/js/util.js'

    export default {
        name: 'realNameAuthentica',
        data() {
            return {
                areaList,
                userInfo: {},
                form: {},
                isDisabled: true,
                showEdit: false,
                showBankPicker: false,
                showAreaPicker: false,
                validCode: {
                    btnText: "获取验证码",
                    isDisabled: false
                },
                columns: [
                    {text: "中国农业银行", value: "10806310"},
                    {text: "中国工商银行", value: "10806311"},
                    {text: "中国银行", value: "10806312"},
                    {text: "交通银行", value: "10806313"},
                    {text: "招商银行", value: "10806325"},
                ],
                subBranchList: [],	//支行列表
                searchKey: "",	//开户支行搜索关键词
                selectedBank: {},	//已选择的开户行
                selectedArea: [],	//已选择的开户地区
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            },
            submit() {
                console.log(this.form)
                let {reallyName, phone, bankId, bankNum, area, yzm, subBranchID, subBranchName} = this.form
                if (utils.isEmpty(phone)) {
                    this.$toast("请输入正确的手机号")
                } else if (utils.isEmpty(yzm)) {
                    this.$toast("请输入验证码")
                } else if (utils.isEmpty(reallyName)) {
                    this.$toast("请输入真实姓名")
                } else if (utils.isEmpty(bankId)) {
                    this.$toast("请输入开户银行")
                } else if (utils.isEmpty(area)) {
                    this.$toast("请完善开户地区信息")
                } else if (utils.isEmpty(subBranchID)) {
                    this.$toast("请选择开户支行")
                } else if (bankNum.length != 19 && bankNum.length != 16) {
                    this.$toast("请核对银行卡号位数");
                } else {
                    let province = this.selectedArea[0] ? this.selectedArea[0].name : this.userInfo.FBankProvince,
                        city = this.selectedArea[1] ? this.selectedArea[1].name : this.userInfo.FBankCity;
                    let params = {
                        phone, yzm, bankid: bankId, backnum: bankNum, city, province, name: reallyName,
                        SubBranchID: subBranchID, SubBranchName: subBranchName,
                        type: utils.isEmpty(this.userInfo.FBankNum) ? 1 : 2,
                    }
                    console.log(params)
                    /*
                    this.API.bindCardInfo(params).then((data) => {
                        if (data.ErrorCode == 100) {

                            this.$toast({
                                duration: 600, // 持续展示 toast
                                forbidClick: true,
                                type: "success",
                                message: '绑定成功',
                                onClose: () => {
                                    this.$router.back()
                                }
                            });

                        } else if (data.ErrorCode == 101) {
                            this.$toast({
                                //forbidClick: true,
                                type: "fail",
                                message: data.Content
                            });
                        } else if (data.ErrorCode == 200) {
                            //var url = "/MobileUserCenter/CardBind"
                            //location.href = "/Mobile/MobileLogin?rturl=" + url;
                            this.$router.push({path: "/login", query: {rturl: "/cardBind"}})
                        }

                    })
                     */
                }
                //this.selectedArea
            },
            //确定选择开户银行
            onBankConfirm(item) {
                console.log(item)
                this.form.bankName = item.text;
                this.form.bankId = item.value;
                this.selectedBank = Object.assign({}, {...item})
                //if(this.selectedArea.length){
                this.getSubBranch(true)
                //}
                this.showBankPicker = false//关闭弹框
            },

            //value=0改变省，1改变市，2改变区
            onAreaChange(picker) {
                let val = picker.getValues();
                //console.log(val)//查看打印
                let areaName = ''
                for (var i = 0; i < val.length; i++) {
                    areaName = areaName + (i == 0 ? '' : '/') + val[i].name
                }
                //this.carmodel = areaName
            },
            //确定选择开户地区
            onAreaConfirm(pItem) {
                console.log(pItem)
                this.form.area = pItem[0].name + "、" + pItem[1].name;
                this.selectedArea = [...pItem]
                this.showAreaPicker = false//关闭弹框
                if (this.form.bankName != "") {
                    this.getSubBranch(true)
                }

            },
            //取消选中城市
            onAreaCancel() {
                this.showAreaPicker = false
                this.$refs.myArea.reset()// 重置城市列表
            },
            getUserInfo() {
                this.API.getUserInfo().then(({data}) => {
                    this.userInfo = data
                    let {real_name, mobile, bank, sub_branch_name, FBankId, bank_card, regist_province, regist_city, SubBranchID, SubBranchName} = data
                    this.form = {
                        reallyName: real_name,
                        phone: mobile,
                        bankName: bank,
                        subBankName: sub_branch_name,
                        bankId: FBankId,
                        bankNum: bank_card,
                        subBranchID: SubBranchID,
                        subBranchName: SubBranchName,
                        area: regist_province + "、" + regist_city
                    }
                    if (utils.isNotEmptyAll(real_name, bank, bank_card)) {	//已认证过
                        this.showEdit = true
                        this.isDisabled = true
                    } else {
                        this.showEdit = false
                        this.isDisabled = false
                    }
                    //this.getSubBranch()

                })
            },
            //获取支行
            getSubBranch(flag = false) {	//flag: true手动搜索，false初始化加载
                let FBankProvince, FBankCity, FName
                if (flag && this.selectedArea.length) {
                    FBankProvince = this.selectedArea[0].name.slice(0, -1);	//搜索是如湖北省不能带上“省”来搜索
                    FBankCity = this.selectedArea[1].name.slice(0, -1);	//搜索是如武汉市不能带上“市”来搜索
                    FName = this.form.bankName;
                } else {
                    FBankProvince = this.userInfo.FBankProvince
                    FBankCity = this.userInfo.FBankCity
                    FName = this.form.bankName || this.userInfo.FName
                }
                //let {FBankProvince, FBankCity, FName } = this.userInfo

                this.API.getSubBranch({
                    Province: FBankProvince,
                    City: FBankCity,
                    BankName: FName,
                    key: this.searchKey
                }).then((data) => {
                    this.subBranchList = data
                })
            },
            forceEdit() {
                if (this.isDisabled) {
                    this.$dialog.confirm({
                        title: '编辑',
                        message: '你确定要强制编辑吗?',
                    }).then(() => {
                        this.isDisabled = false
                    }).catch(() => {
                    });
                } else {
                    this.isDisabled = true
                }
            },
            //联系客服
            concatCus() {
                this.$toast("如有疑问，请及时联系淘大熊客服（晴天或者熊大）")
            },
            //获取验证码
            sendCode() {
                if (!checkMobilePhone(this.form.phone)) {
                    this.$toast('请输入正确手机号');
                } else {
                    this.validCode.isDisabled = true
                    this.API.sendShotMsg({phone: this.form.phone}).then((data) => {
                        if (data.ErrorCode == 100) {
                            this.resetBtn()
                        }
                    })
                    this.resetBtn()
                    this.$toast('马上发送验证码');
                }
            },
            resetBtn() {
                let nums = 60, timer;

                this.validCode.btnText = nums + "秒后重新获取";
                timer = setInterval(() => {
                    nums--;
                    if (nums > 0) {
                        this.validCode.btnText = nums + "秒后重新获取";
                    } else {
                        clearInterval(timer); //清除js定时器
                        this.validCode.isDisabled = false;
                        this.validCode.btnText = '获取验证码';
                    }

                }, 1000)
            }
        },
        created() {
            this.getUserInfo()
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
            padding: 0 10px;

            .cell-group {
                &.finished {
                    /deep/ .van-field__control {
                        color: #999
                    }
                }

                .subBranch {
                    padding: 10px;

                    > select {
                        width: calc(100% - 90px);
                        margin-left: 86px;
                        height: 38px;
                        border: 1px solid #ccc;
                        padding: 0 5px;
                        outline: none;
                    }
                }

                .card_bind_item {
                    position: relative;
                    background: #fd3c3c;
                    font-size: 12px;
                    margin: 10px 0;
                    padding: 10px 5px;
                    line-height: 20px;

                    a.concat {
                        position: absolute;
                        right: 10px;
                        bottom: 10px;
                        color: #006FD9;
                    }
                }
            }

            .btn-group {
                margin-top: 30px;
            }
        }
    }
</style>
