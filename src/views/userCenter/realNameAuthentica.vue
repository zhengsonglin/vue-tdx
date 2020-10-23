<template>
    <div class="page-index bg-fff h100 over-auto realNameAuthentica">
        <div class="header-wrap">
            <van-nav-bar title="实名认证" left-text="" right-text="" left-arrow fixed z-index="10" class="header"
                         @click-left="onClickLeft">
                <template #right>
                    <van-icon name="replay" size="18" style="margin-right: 15px;" @click="getLoginUserInfo"/>
                    <van-icon name="edit" size="18" @click="forceEdit" v-if="showEdit"/>
                </template>
            </van-nav-bar>
        </div>
        <div class="content" v-show="userRealInfo.real_name">

            <van-cell-group class="cell-group">
                <van-field v-model="form.reallyName" label="真实姓名" placeholder="真实姓名" :readonly="isDisabled"/>

                <van-field name="radio" label="性别">
                    <template #input>
                        <van-radio-group v-model="form.sex" direction="horizontal" :disabled="isDisabled">
                            <van-radio :name="0">男</van-radio>
                            <van-radio :name="1">女</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field v-model="form.txt_age" type="digit" label="年龄" placeholder="年龄" :readonly="isDisabled"/>
                <van-field v-model="form.wangwang " label="淘宝会员名" placeholder="淘宝会员名" :readonly="isDisabled"/>
                <p class="tb-tips">绑定平台做任务的旺旺号</p>

                <van-field name="uploader" label="支付宝截图" v-if="!isDisabled">
                    <template #input>
                        <van-uploader v-model="fileList" :max-count="1"/>
                    </template>
                </van-field>
            </van-cell-group>

            <div style="margin: 16px;" v-if="!isDisabled">
                <van-button block type="info" size="small" @click="submit">提交认证申请</van-button>
            </div>
            <div class="real_name_example" v-if="!isDisabled">
                打开手机支付宝登录支付宝 → 点击“我的” → 点击“昵称” → 截图（需要显示真实姓名和旺旺账号）
            </div>

            <div class="imgShow">
                <img :src="form.picture" width="100%"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'realNameAuthentica',
        data() {
            return {
                userRealInfo: {},
                form: {},
                fileList: [],	//要上传的图片列表,(还未提交到后台)
                isDisabled: true,
                showEdit: false
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            },
            getLoginUserInfo() {
                this.API.getLoginUserInfo().then(({data}) => {
                    this.userRealInfo = data
                    //let picture = ""
                    //data.FISRealName = 2
                    //data.CheckCode = "B"
                    if (data.FISRealName == 1) {
                        this.showEdit = true
                        //picture = data.FCaptureAddress
                    } else if (data.FISRealName == 2) {
                        this.isDisabled = false
                        //设置审核客服微信二维码， 也可以使用本地对应的tt和qt二维码
                        if (data.CheckCode == "A") {
                            //picture = "http://www.taodaxiong.cn/Content/Mobile/img/tt.jpg"
                        } else if (data.CheckCode == "B") {
                            //picture = "http://www.taodaxiong.cn/Content/Mobile/img/qt.jpg"
                        }
                    }
                    this.form = {
                        fid: data.FID,
                        reallyName: data.real_name,
                        sex: data.gender == "男" ? 0 : 1,
                        txt_age: data.age,
                        wangwang: data.ww_name,
                        picture: data.prove_img
                    }
                })
            },
            CheckAge(num) {
                var myreg = /^[1-9]+[0-9]*]*$/;
                console.log(typeof num)
                if (!myreg.test(num)) {
                    return false;
                } else {
                    return true;
                }
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
            submit() {
                let {reallyName, txt_age, wangwang} = this.form
                if (reallyName == "") {
                    this.$toast("真实姓名不能为空")
                } else if (txt_age == "") {
                    this.$toast("请输入年龄")
                } else if (!this.CheckAge(txt_age)) {
                    this.$toast("请输入正确的年龄")
                } else if (wangwang == "") {
                    this.$toast("请输入淘宝账号")
                } else if (this.fileList.length == 0) {
                    this.$toast("请上传支付宝截图")
                } else {

                    this.form.File1 = this.fileList.slice(0, 1).file

                    this.API.updateUserAuthentica(this.form).then((data) => {
                        console.log(data)
                        if (data.ErrorCode == 100) {
                            /*
                            this.API.getLoginUserInfo().then((data) => {
                                //格式如下 http://www.taodaxiong.cn/Content/Mobile/img/QRcode3.jpg
                                if (data.CheckCode == "A") {
                                    //$("#r").attr("src", "/Content/Mobile/img/tt.jpg");
                                    //$("#r").attr("src", "/Content/Mobile/img/QRcode2.jpg");
                                    //$("#r").attr("src", "/Content/Mobile/img/QRcode.jpg");
                                } else if (data.CheckCode == "B") {
                                    //$("#r").attr("src", "/Content/Mobile/img/qt.jpg");
                                    //$("#r").attr("src", "/Content/Mobile/img/QRcode3.jpg");
                                    //$("#r").attr("src", "/Content/Mobile/img/QRcode.jpg");
                                }
                                //设置审核客服微信二维码， 也可以使用本地对应的tt和qt二维码
                                if (data.CheckCode == "A") {
                                    picture = "http://www.taodaxiong.cn/Content/Mobile/img/tt.jpg"
                                }else if(data.CheckCode == "B"){
                                    picture = "http://www.taodaxiong.cn/Content/Mobile/img/qt.jpg"
                                }
                            })
                            */
                            this.getLoginUserInfo()
                        } else if (data.ErrorCode == 101) {
                            this.$toast({
                                //forbidClick: true,
                                type: "fail",
                                message: data.Content
                            });
                        } else {
                            //location.href = "/Mobile/MobileLogin";
                            this.$router.push("login")
                        }

                    })
                }

            },
        },
        created() {
            this.getLoginUserInfo()
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
            margin-top: 46px; /*no*/
            padding: 0 10px;

            .cell-group {
                .tb-tips {
                    color: #fd3c3c;
                    margin: 6px 90px 0;
                }
            }

            .real_name_example {
                padding: 10px;
                color: #fd3c3c;
            }

            .imgShow {
                border: 1px solid #ddd;
                margin: 20px 10px;
            }
        }
    }
</style>
