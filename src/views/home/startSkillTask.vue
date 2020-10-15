<template>
    <div class="page-index bg-fff h100 over-auto startSkillTask">
        <div class="header-wrap">
            <van-nav-bar title="开始任务" left-text="" right-text="" left-arrow fixed z-index="10" class="header"
                         @click-left="onClickLeft"/>
        </div>
        <div class="content">
            <div class="task-demand bg-fff c-fff">禁止联系卖家咨询任务相关情况，如有疑问请联系平台客服</div>
            <div class="task-demand bg-fff c-fff">熊抢购非免单任务，返款金额=原价-优惠价+积分抵扣金额</div>

            <div class="task-notice bg-fff">
                <p class="title text-c bold">注意事项</p>
                <p>1、与商家旺旺聊天时禁止提及<span>“淘大熊 、刷单”</span>等信息，否则取消平台任务合作机会！</p>
                <p>2、禁止使用<span>信用卡、花呗、淘金币、集分宝、红包、天猫积分</span>等淘宝商家使用的官方优惠渠道 </p>
                <p>3、禁止通过<span>淘客网、返利网、一淘</span>等返现返利链接下单！</p>
                <p>以上由于买家违规下单所产生的费用，由买家承担。淘大熊有权冻结其帐号，限制提现操作，IP列入黑名单。</p>
            </div>
            <div class="task-step flex bg-fff step-1">
                <div class="left-num">1</div>
                <div class="right-text flex-1">
                    <p>请打开淘宝APP使用账号
                        <span class="blue">{{userLoginInfo.FWang}}</span>登陆。如果已登陆请点击“我的淘宝”-“头像”，确认会员名是否与
                        <!--<span class="blue">{{userLoginInfo.FWang}}</span>-->一致
                    </p>
                    <div class="select_Key" v-if="skillTaskInfo.FSelectKey !=2 ">
                        <p color="red">★复制关键词切换到淘宝APP搜索</p>
                        <p>☆关键词:</p>
                        <div class="keyword-inp">
                            <input type="text" class="keyWords border-box" :value="skillTaskInfo.FSelect" readonly>
                            <van-button type="danger" v-clipboard:copy="skillTaskInfo.FSelect"
                                        v-clipboard:success="onCopy" v-clipboard:error="onError">复制
                            </van-button>
                        </div>
                        <p class="no-product">
                            <span>找不到商品？</span><span class="juBao" @click="showOverlay=true">举报</span>
                        </p>
                    </div>
                    <div class="select_Key select_Key_2" v-if="skillTaskInfo.FSelectKey !=1 ">
                        <p color="red">★复制淘口令切换到淘宝APP(不搜索),等待弹出窗口,点打开</p>
                        <p>☆淘口令:</p>
                        <div class="keyword-inp">
                            <input type="text" class="keyWords border-box" :value="skillTaskInfo.FCommodityKey"
                                   readonly>
                            <van-button type="danger" v-clipboard:copy="skillTaskInfo.FCommodityKey"
                                        v-clipboard:success="onCopy" v-clipboard:error="onError">复制
                            </van-button>
                        </div>
                    </div>

                </div>
            </div>

            <div class="task-step flex bg-fff step-2" v-if="skillTaskInfo.FSelectKey !=2">
                <div class="left-num">2</div>
                <div class="right-text flex-1 flex">
                    ★货比三家,每个商品页从上到下浏览三分钟左右。
                </div>
            </div>

            <div class="task-step flex bg-fff step-3">
                <div class="left-num">{{skillTaskInfo.FSelectKey !=2 ?"3":"2"}}</div>
                <div class="right-text flex-1">
                    <p class="part-3">根据下面的商品信息找到需要购买的宝贝</p>
                    <p class="part-green">★店铺名称</p>
                    <p class="shop-name">☆ <span>{{skillTaskInfo.FShopName}}<!--暖※※※※品--></span></p>
                    <p class="part-green">★商品价格</p>
                    <p class="total-price"> ☆合计：
                        <span class="total">{{ parseFloat(skillTaskInfo.FUnitPrice * 100) / 100 }}</span>元
                        (<span class="single-price">{{parseFloat(skillTaskInfo.FUnitPrice * 100) / 100}}</span>元/件)
                    </p>
                    <p class="part-green">★发货地</p>
                    <p class="place">☆ <span>{{skillTaskInfo.Ffhd}}</span></p>
                    <p class="part-green"> ★价格区间</p>
                    <p>☆<span class="lbl_jgqj">
						{{skillTaskInfo.Fjgqj != "" && skillTaskInfo.Fjgqj_end != "" ? (skillTaskInfo.Fjgqj + " - " + skillTaskInfo.Fjgqj_end) : ""}}</span>
                    </p>
                    <p class="part-green">★备注</p>
                    <p class="lbl_bz">☆<span>{{skillTaskInfo.Fbz}}</span></p>
                    <p class="part-green">★商品主图</p>
                    <p class="img text-c">
                        <img id="lbl_Img" height="100%"
                             :src="skillTaskInfo.FShopImg && skillTaskInfo.FShopImg.replace('../', '/')">
                    </p>
                    <p class="part-red" v-if="parseInt(skillTaskInfo.RemoteRegionIsDeliver) != 0">★提示</p>
                    <p v-if="parseInt(skillTaskInfo.RemoteRegionIsDeliver) != 0">偏远地区不发货</p>
                    <p class="part-green">★核对宝贝，请提交宝贝链接或淘口令</p>
                    <div class="keyword-inp">
                        <span class="left-input inline-block relative border-box">
                            <input type="text" placeholder="请输入宝贝链接或淘口令进行验证" class="border-box" v-model="productLink"
                                   onpaste="return true">
                            <span class="iconfont icon-cha absolute" @click="productLink=''"></span>
                        </span>
                        <van-button type="danger" class="right-btn" @click="validProductLink">验证</van-button>
                    </div>
                    <p class="part-red">获取链接方法：长按宝贝标题获取宝贝链接<br>
                        淘口令获取方法：宝贝标题右边点击“分享”-左下角点击复制链接-粘贴至空格点击验证
                    </p>

                </div>
            </div>

            <div class="notice-tips c-fff">
                注意：收到货后再确认收货，五星好评，然后上传好评截图到平台，等待商家审核之后申请提现返款。
            </div>

            <div class="task-step flex bg-fff step-4" v-if="skillTaskInfo.FIsValidation == 1 || isValidSuccess">
                <div class="left-num">{{skillTaskInfo.FSelectKey !=2 ?"4":"3"}}</div>
                <div class="right-text flex-1">
                    <p class="part-green">★活动信息</p>
                    <div class="task-co-user-info">
                        <p>接手旺旺</p>
                        <input type="text" readonly v-model="userLoginInfo.FWang">
                    </div>
                    <div class="task-co-user-info">
                        <p>实际支付金额</p>
                        <input type="text" v-model="form.orderPrice" placeholder="请输入你支付的金额" @blur="validPrice">
                    </div>
                    <div class="task-co-user-info">
                        <van-radio-group v-model="form.radio" direction="horizontal">
                            <p style="width: 94px;">积分抵换</p>
                            <van-radio name="1">否</van-radio>
                            <van-radio name="0">是</van-radio>
                        </van-radio-group>
                    </div>
                    <div class="task-co-user-info" v-if="form.radio==2">
                        <p>积分兑换数量</p>
                        <input type="number" placeholder="请输入抵换积分数量" v-model="form.point">
                    </div>

                    <div class="task-co-user-info">
                        <p>订单编号</p>
                        <input type="text" placeholder="请输入订单号" v-model="form.orderNum">
                    </div>
                    <div class="task-co-user-info">
                        <p>买家备注</p>
                        <input type="text" placeholder="20字以内（可不填）" v-model="form.remark">
                    </div>
                    <div class="task-co-user-info">
                        <van-button type="danger" block size="small" @click="submit">提交信息</van-button>
                    </div>

                </div>
            </div>

            <!--举报商品弹窗-->
            <van-overlay :show="showOverlay" z-index="10"><!--@click="showOverlay = false"-->

                <div class="overlay-wrapper bg-fff over-hidden" @click.stop>
                    <div class="dialog-header c-fff text-c">举报内容</div>
                    <div class="dialog-content">
                        <div class="row-item">
                            <van-radio-group v-model="reportContent">
                                <van-radio name="任务价格不一致">任务价格不一致</van-radio>
                                <van-radio name="淘宝找不到宝贝">淘宝找不到宝贝</van-radio>
                                <van-radio name="任务图片不一致">任务图片不一致</van-radio>
                                <van-radio name="没有指定规格的宝贝">没有指定规格的宝贝</van-radio>
                                <van-radio name="商家有运费">商家有运费</van-radio>
                            </van-radio-group>
                        </div>

                    </div>
                    <div class="dialog-btn-group text-c c-fff flex">
                        <div class="btn-left flex-1" @click="showOverlay=false">取消</div>
                        <div class="btn-right flex-1" @click="handleReport">确定</div>
                    </div>

                </div>

            </van-overlay>
        </div>
    </div>
</template>

<script>
    // import utils from "@/utils/utils"
    import {mapState} from 'vuex'

    export default {
        name: 'startSkillTask',
        data() {
            return {
                taskId: "",
                skillTaskInfo: {},
                form: {},
                productLink: "",	//商品链接或者淘口令
                isValidSuccess: false,	//商品验证通过
                showOverlay: false,	//是否显示举报弹窗
                reportContent: "任务价格不一致",	//举报原因
            }
        },
        computed: {
            ...mapState(["userLoginInfo"])
        },
        created() {
            this.taskId = this.$route.query.TaskId;
            console.log(this.userLoginInfo)
            console.log(this.taskId)
            this.getSkillTaskInfo()
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            },
            getSkillTaskInfo() {
                this.API.getSkillTaskInfo({TaskId: this.taskId}).then((data) => {
                    this.skillTaskInfo = data
                })
            },
            //验证商品价格
            validPrice() {
                if (this.form.orderPrice != this.skillTaskInfo.FGoodsUnitPrice) {
                    this.$toast("您的实付金额与任务金额不一致，请及时联系客服处理，以免影响亲的返款。")
                    return;
                }
            },
            //完成任务
            submit() {
                console.log(this.form)
                let {orderNum, orderPrice, remark, radio, point} = this.form
                let FUnitPrice = parseFloat(this.skillTaskInfo.FUnitPrice * 100) / 100
                if (radio == 0) {
                    let re = /^[1-9]+[0-9]*]*$/;
                    if (!re.test(point)) {
                        this.$toast("积分必须为整数");
                        return;
                    }
                    if (parseInt(point) == 0) {
                        this.$toast("积分抵换数量必须大于0");
                        return;
                    }
                }

                if (orderPrice != FUnitPrice) {
                    this.$toast("您的实付金额与任务金额不一致，请及时联系客服处理，以免影响亲的返款。")
                    return;
                }

                if (orderNum.length != 18 && orderNum.length != 19) {
                    this.$toast("订单号必须是18-19位");
                    return;
                }
                let re = /^[1-9]+[0-9]*]*$/;

                if (!re.test(orderNum)) {
                    this.$toast("订单号必须是纯数字组成");
                    return;
                }

                point = point == "" ? 0 : point;
                this.API.complateSkillTask({
                    TaskId: this.taskId,
                    OrderNum: orderNum,
                    remark,
                    price: orderPrice,
                    point
                }).then((data) => {
                    if (data.ErrorCode == 100) {
                        this.$toast({
                            duration: 600, // 持续展示 toast
                            forbidClick: true,
                            type: "success",
                            message: '提交成功',
                            onClose: () => {
                                this.$router.push({name: "taskCenter", params: {orderType: 1}})
                            }
                        });
                    } else {
                        this.$toast({
                            //forbidClick: true,
                            type: "fail",
                            message: data.Content
                        });
                    }

                })
            },
            //确定举报
            handleReport() {
                let {FID} = this.skillTaskInfo
                this.API.addOrderReport({orderId: this.taskId, fid: FID, reson: this.reportContent}).then((data) => {
                    if (data.ErrorCode == 100) {
                        this.$toast({
                            duration: 600, // 持续展示 toast
                            forbidClick: true,
                            type: "success",
                            message: '举报成功，请等待平台处理！',
                            onClose: () => {
                                this.$router.push("home")
                            }
                        });
                    } else {
                        this.$toast({
                            //forbidClick: true,
                            type: "fail",
                            message: data.Content
                        });
                    }

                })
            },
            onCopy() {
                this.$toast("复制成功")
                //skillTaskInfo.FSelect
            },
            onError() {
                this.$toast("复制失败")
            },
            //验证商品链接或者淘口令
            validProductLink() {
                if (this.productLink == "") {
                    this.$toast("请先填写宝贝链接地址!")
                } else {
                    console.log(this.taskId, this.productLink)

                    this.API.checkSkillGoodsUrl({
                        "taskId": this.taskId,
                        "goodsUrl": encodeURI(this.productLink)
                    }).then((data) => {
                        if (data.ErrorCode == 100) {
                            this.isValidSuccess = true
                            this.$toast("验证成功");
                        } else {
                            this.$toast({
                                //forbidClick: true,
                                type: "fail",
                                message: "验证失败"
                            });
                        }
                    })
                }
            }


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
            padding: 5px 10px;
            background-color: #efeff4;

            .task-demand {
                box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
                background-color: #fd3c3c;
                font-size: 16px;
                margin-bottom: 10px;
                padding: 8px 10px;
            }

            .task-notice {
                margin: 10px auto;
                font-size: 13px;
                box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
                padding: 10px 15px;
                line-height: 24px;

                p.title {
                    font-size: 17px;
                    color: #fd3c3c;
                    margin-bottom: 6px;
                }

                span {
                    color: #fd3c3c;
                    font-weight: 800;
                }
            }

            .task-step {
                box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
                margin-bottom: 10px;

                .left-num {
                    width: 50px;
                    flex-basis: 50px;
                    font: italic bold 60px '楷体';
                    color: #fd3c3c;
                    position: relative;

                }

                .part-green {
                    color: #3ebf3e;
                    margin-bottom: 0;
                }

                .part-red {
                    color: #fd3c3c;
                }

                .right-text {
                    > p {
                        line-height: 20px;
                        margin: 10px 0;
                        padding-right: 10px;
                        font-size: 12px;

                        .blue {
                            color: #1cd1ef;
                        }
                    }

                    .select_Key {
                        &.select_Key_2 {
                            margin-bottom: 10px;
                        }

                        p {
                            margin-bottom: 5px;
                        }

                        .keyword-inp {
                            .keyWords {
                                height: 44px; /*no*/
                                line-height: 44px; /*no*/
                                border: 1px solid #ccc;
                                outline: none;
                                width: calc(100% - 85px); /*no*/
                                margin-right: 15px; /*no*/
                                border-radius: 3px;
                                padding: 0 10px;
                            }
                        }

                        p.no-product {
                            margin: 12px 0 8px;

                            .juBao {
                                color: red;
                                text-decoration: underline;
                            }
                        }
                    }
                }

                &.step-2 {
                    .right-text {
                        align-items: center;
                    }
                }

                &.step-3 {
                    p {
                        margin: 0 0 4px 0;

                        &.img {
                            height: 160px;

                        }
                    }

                    .keyword-inp {
                        .left-input {
                            width: calc(100% - 90px); /*no*/
                            margin-right: 15px; /*no*/
                            input {
                                width: 100%;
                                height: 44px; /*no*/
                                line-height: 44px; /*no*/
                                border: 1px solid #ccc; /*no*/
                                border-radius: 4px;
                                padding: 0 5px;
                            }

                            .icon-cha {
                                height: 20px;
                                width: 20px;
                                right: 3px;
                                top: 50%;
                                margin-top: -10px;
                            }
                        }
                    }
                }

                &.step-4 {
                    .task-co-user-info {
                        overflow: hidden;
                        margin-bottom: 10px;
                        padding-right: 10px;

                        > p {
                            width: 80px;
                            float: left;
                            line-height: 34px;
                        }

                        > input {
                            width: calc(100% - 95px);
                            float: right;
                            height: 34px;
                            line-height: 34px;
                            border: 1px solid #ccc;
                            outline: none;
                            border-radius: 4px;
                            padding: 0 10px;
                            box-sizing: border-box;
                        }
                    }
                }

            }

            .notice-tips {
                margin-top: 8px;
                padding: 8px;
                font-size: 13px;
                background-color: #fd3c3c;
                box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
            }

            .overlay-wrapper {
                width: 80%;
                height: fit-content;
                position: absolute;
                left: 0;
                right: 0;
                top: -10px;
                bottom: 0;
                margin: auto;
                border-radius: 8px;

                .dialog-header, .dialog-btn-group {
                    background: linear-gradient(90deg, #ff7459, #eb3c3c);
                    height: 46px;
                    line-height: 46px;
                    font-size: 16px;

                    .btn-left {
                        border-right: 1px solid #fff;
                    }

                    .btn-right {
                        border-left: 1px solid #fff;
                    }
                }

                .dialog-content {
                    padding: 15px 20px;

                    .row-item {
                        font-size: 15px;
                        margin: 10px 0;
                        line-height: 30px;

                        /deep/ .van-radio {
                            margin-bottom: 10px;
                        }
                    }

                    .popout-red {
                        color: #f94545;
                        line-height: 30px;
                        font-size: 14px;
                    }
                }

            }
        }
    }
</style>
