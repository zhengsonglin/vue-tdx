<template>
    <!--skillTaskDetail-->
    <div class="page-index productDetail bg-fff h100 over-auto" v-if="productInfo.t_id">
        <my-swiper class="mySwiper" height="300" :datas="imgList" :autoplayTime="3500"
                   v-if="imgList.length"></my-swiper>

        <div class="nav-btn btn-left absolute text-c c-fff" @click="$router.back()"><i
                class="iconfont icon-zuojiantou"></i></div>
        <div class="nav-btn btn-right absolute text-c c-fff"><i class="iconfont icon-other"
                                                                @click.stop="showMenuNav=!showMenuNav"></i>
            <div class="menu-nav bold" v-show="showMenuNav" @click.stop="showMenuNav=false">
                <router-link to="home" tag="p">首页</router-link>
                <router-link to="taskCenter" tag="p">任务列表</router-link>
                <router-link to="refundRecord" tag="p">我的财务</router-link>
                <router-link to="userCenter" tag="p">个人中心</router-link>
            </div>
        </div>

        <div class="content">
            <div class="com-detail detail-title over-hidden">
                <div class="cell-row row-1">
                    <span class="productName bold">{{productInfo.title}}</span>
                </div>
                <div class="cell-row row-2">任务金额<span class="price f18 red">￥{{productInfo.price}}</span>元
                    <div class="title-price-sur fr">剩余 <span class="red f20">{{productInfo.remain_count}}</span>份 / 限购
                        <span class="red f20">{{productInfo.task_count}}</span>份</div>
                </div>
            </div>
            <!-- 活动金额介绍 -->
            <div class="com-detail detail-fl flex van-row--align-center">
                <span >最低价 <span class="red f18"> {{productInfo.current_price}} 元</span></span>
                <div class="flex-right red">
                    <span class="c-fff inline-block span-1 bg-f00">返利</span>
                    <span class="span-2">￥{{toDecimal2(productInfo.price - productInfo.current_price)}}</span>
                </div>
            </div>
            <!-- 活动时间介绍 -->
            <div class="com-detail detail-time">
                <span class="time-over red">截止日期: {{productInfo.end_time}}</span>
            </div>

            <!-- 保险金 -->
            <div class="com-detail detail-blue">
                <span class="bg-f00 c-fff">熊抢购非免单任务，返款金额 = {{toDecimal2(productInfo.price - productInfo.current_price)}} + 积分金额</span>
            </div>


            <!-- 任务流程 -->
            <div class="com-detail detail-proc">
                <p class="proc-title"><span class="iconfont icon-tianping"></span>任务流程</p>
                <p>1、点击“立即领取”，获取免单资格</p>
                <p>2、点击"开始任务"，按照任务提示，以<span class="price">{{productInfo.price}}</span>元价格去指定平台购买</p>
                <p>3、填写订单号，并提交任务。</p>
                <p>4、卖家确认无误后，平台返款<span class="price">{{productInfo.SkillPrice}}</span>元到您的账户中供您提现</p>
            </div>

            <!-- 注意事项 -->
            <div class="com-detail detail-item">
                <p class="proc-title red"><span class="iconfont icon-zhuyi-yin"></span>注意事项</p>
                <p>1、与商家旺旺聊天时禁止提及<span class="key">“淘大熊 、试客、试单、刷单”</span>等信息，否则取消平台任务合作机会！</p>
                <p>2、禁止使用<span class="key">信用卡、花呗、淘金币、集分宝、优惠券、红包、天猫积分</span>等淘宝商家使用的官方优惠渠道</p>
                <p>3、禁止通过<span class="key">淘客网、返利网、一淘</span>等返现返利链接下单！</p>
                <p>以上由于买家违规下单所产生的费用，由买家承担。淘大熊有权冻结其帐号，限制提现操作，IP列入黑名单。</p>
            </div>

            <!-- 温馨提示 -->
            <div class="com-detail detail-remi">
                <p class="proc-title"><span class="iconfont icon-xiaolian"></span>温馨提示</p>
                <p>1、用户获取免单资格后，请根据时间提示<span>及时下单并提交订单号。</span></p>
                <p>2、若因未按时提交任务信息而被系统取消任务资格，平台概不负责！</p>
            </div>

            <!-- 宝贝详情 -->
            <div class="com-detail-baby" v-html="productInfo.FHtmlString" v-show="showSomeProductInfo"></div>

        </div>
        <div class="foot-bar fixed bg-fff text-c">
            <van-row>
                <van-col span="12"><!--mediumseagreen-->
                    <van-col span="12">
                        <div class="wrap flex home">
                            <p><span class="mui-icon iconfont icon-menu1 f20"></span></p>
                            <router-link tag="p" to="home">首页</router-link>
                        </div>
                    </van-col>
                    <van-col span="12">
                        <div class="wrap flex customer">
                            <p><span class="mui-icon iconfont icon-changyonglogo28 f20"></span></p>
                            <p @click="handleHelp">客服</p>
                        </div>
                    </van-col>
                </van-col>
                <van-col span="12">
                    <van-button size="large" block :color="btnInfo.color" :disabled="btnInfo.disabled" class="f18"
                                @click="showOverlay = true">{{btnInfo.text}}
                    </van-button>
                </van-col>

            </van-row>
        </div>

        <van-overlay :show="showOverlay" @click="showOverlay = false">
            <div class="overlay-wrapper bg-fff over-hidden" @click.stop>
                <div class="dialog-header c-fff text-c">商品信息</div>
                <div class="dialog-content">
                    <div class="row-item row-1 flex">
                        <span class="title">商品名称:</span><span class="info flex-1 text-r">{{productInfo.title}}</span>
                    </div>
                    <div class="row-item row-2 flex">
                        <span class="title">商品价格:</span><span
                            class="info price flex-1 text-r">￥{{productInfo.price}}</span>
                    </div>
                    <div class="popout-red popout-item m-top10">
                        <p>注：1.领取任务后，2小时有效，超过2小时，任务自动退回，请在自动时间内完成任务！</p>
                        <p>2.每天00:00平台停止抢单，00:00没有提交任务的订单将会自动退单，请及时完成任务</p>
                        <p class="bearTips"><i class="van-icon van-icon-warning" style="vertical-align: middle"><!----></i>
                            此单为真实购买，只返款3.00元，请确认
                        </p>
                    </div>
                </div>
                <div class="dialog-btn text-c c-fff" @click="handleBuy">确定</div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
    import MySwiper from 'components/swiper/swiper'

    export default {
        name: "skillTaskDetail",
        components: {
            MySwiper,
        },
        computed: {
            imgList() {
                let {img} = this.productInfo;
                return [img, img]
            },
        },
        data() {
            return {
                showMenuNav: false,
                productInfo: {},
                showOverlay: false,
                showSomeProductInfo: true,
                inventoryStatus: 1,	//库存充足， 0库存不足
                btnInfo: {
                    color: "#fd3c3c",
                    text: "立即领取",
                    disabled: false,
                },
            }
        },
        methods: {
            handleHelp() {
                this.$toast('如有疑问，请及时联系淘大熊客服（晴天或者熊大）！');
            },
            getSkillTaskDetail() {
                this.API.getProductDetail({t_id: this.tId}).then(({data}) => {
                    this.productInfo = data
                })
            },
            //开始任务
            startTask(orderId) {
                this.$router.push({path: "/startSkillTask", query: {orderId}})
                /*this.API.startTask({tId: this.tId}).then((data) => {
                    if (data.ErrorCode == 100) {
                        this.$router.push({path: "/startSkillTask", query: {TaskId: data.Content}})
                    } else {
                        this.$router.push("login")
                    }

                })*/
            },
            //领取任务
            handleBuy() {
                this.showOverlay = false
                //getTheTask
                this.API.getTheTask({t_id: this.tId}).then(({error, order_id}) => {
                    if (error.errno == 200) {
                        this.$dialog.alert({
                            title: '恭喜你',
                            message: '商品抢购成功，请按时完成任务！',
                        }).then(() => {
                            this.startTask(order_id)
                        })
                    } else {
                        this.$toast(error.usermsg || error.errmsg)
                    }

                })
            },
        },
        created() {
            this.tId = this.$route.query.tId
            this.getSkillTaskDetail();
        }
    }
</script>

<style lang="scss" scoped>
    .page-index {
        > .nav-btn {
            width: 36px;
            height: 36px;
            line-height: 36px;
            top: 10px;
            background: rgba(0, 0, 0, .4);
            border-radius: 50%;
        }

        .btn-left {
            left: 20px;
        }

        .btn-right {
            right: 20px;

            .menu-nav {
                position: absolute;
                background: rgba(255, 255, 255, .8);
                border: 1px solid black;
                border-radius: 8px;
                width: 110px;
                right: 0;
                top: 42px;
                color: #000;
                font-size: 14px;
            }
        }

        .content {
            padding-bottom: 70px; /*no*/
            .red {
                color: #ff0045;
            }

            .com-detail {
                border-top: 1px solid #bbb;
                min-height: 50px;
                line-height: 50px;
                font-size: 15px;
                padding: 0 10px;
                color: #666;

                &.detail-title {
                    height: 66px;
                    padding: 5px 10px;
                    border-top: 1px solid #bbb;

                    .cell-row {
                        overflow: hidden;
                        line-height: 32px;

                        &.row-1 {
                            .productName {
                                font-size: 16px;
                                color: #333;
                            }
                        }

                        &.row-2 {
                            .title-price-sur {
                                font-size: 14px;
                            }
                        }
                    }
                }

                &.detail-fl{
                    .flex-right{
                        margin-left: 10px; border: 1px solid #fa2742;line-height: 20px;
                        >span{
                            padding:0 4px;
                            font-size: 14px;
                        }
                    }
                }
                .detail-remark {
                    font-size: 16px;
                }

                &.detail-time {
                    font-size: 14px;
                    .time-over{
                        border: 1px solid #fa2742;
                        padding: 5px 14px;
                        border-radius: 4px;
                    }
                }

                &.detail-insu {
                    font-size: 14px;
                    color: #4fb74f;

                    .icon-yinxingqia {
                        font-size: 18px;
                        vertical-align: middle;
                    }
                }

                &.detail-proc {
                    padding: 0 30px;
                    font-size: 15px;
                    line-height: 30px;

                    .proc-title {
                        color: orange;
                        font-size: 18px;
                        margin: 10px 0;
                    }

                    span.price {
                        color: orange;
                    }
                }

                &.detail-item {
                    padding: 0 30px;
                    line-height: 30px;

                    .proc-title {
                        font-size: 18px;
                        margin: 10px 0;

                        > span {
                            font-size: 24px;
                            vertical-align: middle;
                            margin-right: 10px;
                        }
                    }

                    p > span.key {
                        color: #f94545;
                    }
                }

                &.detail-remi {
                    padding: 0 30px;
                    line-height: 30px;

                    .proc-title {
                        color: green;
                        margin: 10px 0;
                        font-size: 18px;

                        > span {
                            font-size: 24px;
                            vertical-align: middle;
                            margin-right: 10px;
                        }
                    }

                    p > span {
                        color: mediumseagreen;
                    }
                }

                &.detail-blue {
                    font-size: 13px;
                    >span{
                        padding:4px 30px 4px 6px;
                        margin-left: -10px;
                        border-radius: 0 40px 40px 0;
                    }
                }
            }
        }

        .foot-bar {
            left: 0;
            right: 0;
            bottom: 0;
            height: 50px; /*no*/
            line-height: 50px; /*no*/
            border-top: 1px solid #ccc;
            box-shadow: 0 0 6px 1px #ccc; /*no*/
            /deep/ .wrap {
                height: 50px; /*no*/
                line-height: initial;
                font-size: 16px;
                color: mediumseagreen;
                justify-content: center;
                flex-direction: column;
                box-sizing: border-box;

                &.home {
                    border-right: 1px solid #ccc;
                }

                &.customer {
                    border-left: 1px solid #ccc;
                }
            }
        }

        .overlay-wrapper {
            width: 86%;
            height: fit-content;
            position: absolute;
            left: 0;
            right: 0;
            top: -10px;
            bottom: 0;
            margin: auto;
            border-radius: 8px;

            .dialog-header, .dialog-btn {
                background: linear-gradient(90deg, #ff7459, #eb3c3c);
                height: 46px;
                line-height: 46px;
                font-size: 16px;
            }

            .dialog-content {
                padding: 15px 10px 25px;

                .row-item {
                    font-size: 15px;
                    margin: 10px 0;
                    line-height: 30px;

                    .title {
                        width: 70px;
                        flex-basis: 70px;
                    }
                    .info{
                        color: #888;
                    }
                    .price {
                        color: #f94545;
                    }
                }

                .popout-red {
                    color: #666;
                    font-size: 12px;
                    line-height: 20px;
                    .bearTips{
                        font-size: 14px;
                        color: #f94545;
                        margin-top: 10px;
                    }
                }
            }

            &.overlay2 {
                select {
                    height: 46px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    outline: none;
                    padding-left: 12px;
                    font-size: 20px;
                }
            }

        }

    }

</style>
