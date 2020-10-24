<template>
    <div class="page-userCenter w100 h100 over-auto" v-show="!isLoading">
        <p class="page-title text-c w100 c-fff">个人中心</p>
        <div class="content">
            <div class="user-info">
                <div class="order-num-info c-fff text-c">
                    <p><span class="total-num">{{userInfo.order_month_num | parseExcludeZero(999) }}</span></p>
                    <p><span class="total-num-desc">免单30天总单量</span></p>
                </div><!--userInfo.FAccountBalance ? userInfo.FAccountBalance:999.98-->
                <div class="btn-grop c-fff text-c">
                    <div class="btn-plain inline-block">
                        账户余额：<span>{{userInfo.balance | parseExcludeZero(999.98)}}</span></div>
                    <div class="btn-plain inline-block">积分：<span>0</span></div>
                    <p class="tips">100积分=1元</p>
                </div>
                <div class="per-bill-img"></div>
            </div>
            <div class="invit-info">
                <div class="con-per-username">用户名：<label id="lbl_UserName">{{userInfo.account |
                    parseExcludeZero(18899996666) }}</label></div>
                <div class="con-per-invide">邀请码：<label id="lbl_InviteCode">{{userLoginInfo.invite_code |
                    parseExcludeZero(888888) }}</label></div>
            </div>

            <div class="card-info bg-fff">
                <div class="row-1">
                    <span :class="['free_activity', {'color_red':orderType==='1'}]" @click="orderType='1'">限量免单任务</span>
                    <span :class="['second_activity', {'color_red':orderType==='2'}]" @click="orderType='2'">熊抢购任务</span>
                </div>
                <div class="row-2">
                    <van-row>
                        <van-col span="6">
                            <div class="order-state text-c">
                                <p><span class="li-icon iconfont icon-moban c_red f22" style="color:#d17575"></span>
                                </p>
                                <router-link :to="{name:'taskCenter', params:{activeIndex:4, orderType}}" tag="p">已领取
                                </router-link>
                                <p>
                                    {{orderType==='1'?userInfo.order_num.free.received_num:userInfo.order_num.xqg.received_num}}</p>
                            </div>
                        </van-col>
                        <van-col span="6" v-if="orderType==='1'">
                            <div class="order-state text-c">
                                <p><span class="li-icon iconfont icon-tijiao c_blue f22" style="color:#509de8"></span>
                                </p>
                                <router-link :to="{name:'taskCenter', params:{activeIndex:1, orderType}}" tag="p">已提交
                                </router-link>
                                <p>
                                    {{orderType==='1'?userInfo.order_num.free.submitted_num:userInfo.order_num.xqg.submitted_num}}</p>
                            </div>
                        </van-col>
                        <van-col span="6">
                            <div class="order-state text-c">
                                <p><span class="li-icon iconfont icon-shenhe2 c_orange f22"
                                         style="color:#ecb071"></span></p>
                                <router-link :to="{name:'taskCenter', params:{activeIndex:2, orderType}}" tag="p">待审核
                                </router-link>
                                <p>
                                    {{orderType==='1'?userInfo.order_num.free.pending_review_num:userInfo.order_num.xqg.pending_review_num}}</p>
                            </div>
                        </van-col>
                        <van-col span="6">
                            <div class="order-state text-c">
                                <p><span class="li-icon iconfont icon-wancheng c_black f22"
                                         style="color:#e9769f"></span></p>
                                <router-link :to="{name:'taskCenter', params:{activeIndex:3, orderType}}" tag="p">已完成
                                </router-link>
                                <p>
                                    {{orderType==='1'?userInfo.order_num.free.completed_num:userInfo.order_num.xqg.completed_num}}</p>
                            </div>
                        </van-col>
                    </van-row>
                </div>
            </div>

            <div class="my-fans-info">
                <van-row gutter="20">
                    <van-col span="12">
                        <div class="item bg-fff h100">
                            <p>推荐人数</p>
                            <p class="red">{{userInfo.fan_num | parseExcludeZero(998) }}</p>
                        </div>
                    </van-col>
                    <van-col span="12">
                        <div class="item bg-fff">
                            <p>免单总数</p>
                            <p class="red">{{getABCount}}</p>
                        </div>
                    </van-col>
                </van-row>
            </div>

            <div class="other-info over-hidden">
                <van-grid clickable :column-num="3" :border="true">
                    <van-grid-item text="分析给好友" to="/recommendFriend">
                        <span class="mui-icon iconfont icon-fenxiang bg-pink" slot="icon"></span>
                    </van-grid-item>
                    <van-grid-item text="返款记录" to="/refundRecord">
                        <span class="mui-icon iconfont icon-baozhengjin1 bg-green" slot="icon"></span>
                    </van-grid-item>
                    <van-grid-item text="预定任务" to="/reservationRecord">
                        <span class="mui-icon iconfont icon-yuding bg-blue" slot="icon"></span>
                    </van-grid-item>
                    <van-grid-item text="实名认证" to="/realNameAuthentica">
                        <span class="mui-icon iconfont icon-shimingrenzheng bg-red" slot="icon"></span>
                    </van-grid-item>
                    <van-grid-item text="银行卡绑定" to="/cardBind">
                        <span class="mui-icon iconfont icon-yinxingqia bg-orange" slot="icon"></span>
                    </van-grid-item>
                    <van-grid-item text="资金明细" to="/financeCenter">
                        <span class="mui-icon iconfont icon-tixianfc bg-blue" slot="icon"></span>
                    </van-grid-item>
                    <van-grid-item text="账户提现" to="/withDrawCash">
                        <span class="mui-icon iconfont icon-tixian bg-blue" slot="icon"></span>
                    </van-grid-item>
                    <van-grid-item text="问题集" to="/question">
<!--                        <span class="mui-icon iconfont icon-caiwu bg-yellow" slot="icon"></span>-->
                        <van-icon class="mui-icon bg-yellow" name="question-o" />
                        <span class="van-grid-item__text">问题集</span>
                    </van-grid-item>
                    <van-grid-item text="基本资料" to="/baseUserInfo">
                        <span class="mui-icon iconfont icon-iconfontgerenzhongxin bg-green" slot="icon"></span>
                    </van-grid-item>
                    <van-grid-item text="新手攻略" to="/newUserStrategy">
                        <span class="mui-icon iconfont icon-bangzhu bg-purple" slot="icon"></span>
                    </van-grid-item>
                    <van-grid-item text="投诉与建议" to="/touSu">
                        <span class="mui-icon van-icon van-icon-manager bg-pink" slot="icon"></span>
                    </van-grid-item>
                    <van-grid-item text="修改密码" to="/changePwd">
                        <span class="mui-icon iconfont icon-xiugaimima2 bg-black" slot="icon"></span>
                    </van-grid-item>
                </van-grid>
            </div>

            <div class="suggestion-bk bg-fff text-c over-hidden">
                <van-row>
                    <van-col span="12">
                        <router-link tag="p" class="item line" :to="'feedBack'">意见反馈</router-link>
                    </van-col>
                    <van-col span="12">
                        <router-link tag="p" class="item" :to="'updateDescription'">更新说明</router-link>
                    </van-col>

                </van-row>
            </div>
        </div>
        <div class="login-out over-hidden">
            <van-button type="danger" block @click="logout">退出登录</van-button>
        </div>
        <p style="height: 50px;"></p>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
        name: "userCenter",
        data() {
            return {
                userInfo: {
                    order_num: {
                        free: {},
                        xqg: {}
                    }
                },
                isLoading: true,
                orderType: '1',	//1限量免单订单，2熊抢购订单
            }
        },
        computed: {
            getABCount(){
                let {free: { after_sale_num, submitted_num, pending_review_num, completed_num, received_num } } = this.userInfo.order_num
                return (after_sale_num+submitted_num+pending_review_num+completed_num+received_num) || 999
            },
            ...mapState(["userLoginInfo"])
        },
        methods: {
            getIndexInfo() {
                this.API.getIndexInfo().then(({data}) => {
                    //console.log(data)
                    this.userInfo = data
                    this.isLoading = false
                })
            },
            logout() {
                //this.$cookies.set("user_session","25j_7Sl6xDq2Kc3ym0fmrSSk2xV2XkUkX")
                console.log(this.$cookies.get("UserInfo"))
                console.log(document.cookie)
                this.cleanAllState()
                this.$router.push("login")
            },
            ...mapMutations({
                cleanAllState: "cleanAllState"
            })
        },
        created() {
            this.getIndexInfo();
        }
    }
</script>

<style lang="scss" scoped>
    .page-userCenter {
        .page-title {
            position: fixed;
            top: 0;
            left: 0;
            height: 48px;
            line-height: 48px;
            background-color: #fd3c3c;
            font-size: 17px;
            z-index: 100;
        }

        .content {
            margin-top: 48px;

            .user-info {
                background: linear-gradient(90deg, #eb3c3c, #ff7459);
                min-height: 112px;
                position: relative;

                .order-num-info {
                    padding: 20px 0;

                    .total-num {
                        font-size: 30px;
                        margin: 0 auto;
                    }

                    .total-num-desc {
                        font-size: 16px;
                    }
                }

                .btn-grop {
                    /*padding-bottom: 10px;*/
                    position: relative;
                    z-index: 10;

                    .btn-plain {
                        width: 35%;
                        border: 1px solid #eee;
                        border-radius: 10px;
                        background: linear-gradient(90deg, #eb3c3c, #ff7459);
                        height: 28px;
                        line-height: 28px;
                        font-size: 14px;
                        margin: 0 6px;
                    }

                    p.tips {
                        position: absolute;
                        left: calc(50% + 10px);
                        bottom: -22px;
                        width: 35%;
                    }
                }

                .per-bill-img {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background-color: #f4f4f4;;
                    padding: 5px;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-27px);
                    bottom: -70px;
                    z-index: 10;
                }

                &::after {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: -44px;
                    z-index: 1;
                    content: ' ';
                    height: 80px;
                    width: 100%;
                    border-radius: 0 0 50% 50%;
                    background: linear-gradient(90deg, #eb3c3c, #ff7459);
                }
            }

            .invit-info {
                margin-top: 66px;
                padding-left: 24px;

                .con-per-username {
                    font-size: 20px;
                    color: #80c7c7;
                    margin-bottom: 10px;
                    font-weight: bolder;
                }

                .con-per-invide {
                    font-size: 16px;
                    font-weight: bolder;
                    color: #fd3c3c;
                }
            }

            .card-info {
                background-clip: padding-box;
                box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
                margin: 20px 10px;
                border-radius: 10px;

                .row-1 {
                    font-size: 16px;
                    padding: 12px;
                    position: relative;

                    .free_activity, .second_activity {
                        margin-right: 10px;

                        &.color_red {
                            color: #fd3c3c;
                            font-weight: 900;
                        }
                    }

                    &::after {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        left: 0;
                        height: 1px;
                        content: '';
                        /*-webkit-transform: scaleY(.5);
                        transform: scaleY(.5);*/
                        background-color: #c8c7cc;
                    }
                }

                .row-2 {
                    .order-state {
                        padding: 16px 0;
                        font-size: 14px;
                    }
                }
            }

            .my-fans-info {
                margin: 20px;

                .item {
                    background-clip: padding-box;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
                    overflow: auto;
                    border-radius: 10px;
                    border-bottom: 1px solid #d4d4d4;

                    p {
                        font-size: 16px;
                        text-align: center;
                        margin: 10px 0 8px;

                        &.red {
                            color: #fd3c3c;
                        }
                    }
                }
            }

            .other-info {
                margin: 20px 10px;
                border-radius: 10px;

                /deep/ .van-grid-item__content::after {
                    border-width: 0 3px 3px 0; /*no*/
                }

                /deep/ .mui-icon {
                    font-size: 20px;
                    position: relative;
                    height: 32px;
                    line-height: 32px;
                    width: 32px;
                    /* padding-top: 10px;*/
                    border-radius: 5px;
                    color: #fff;
                    font-weight: 900;
                    display: inline-block;
                    text-align: center;
                    margin-bottom: 6px;
                }

                /deep/ .van-grid-item__content--clickable {
                    padding: 22px 0;
                }

                .bg-pink {
                    background: linear-gradient(to right, #f0785d, #e35e40);
                }

                .bg-purple {
                    background: linear-gradient(to right, #edb2f8, #df93ed);
                }

                .bg-blue {
                    background: linear-gradient(to right, #509de8, #006fd9);
                }

                .bg-red {
                    background: linear-gradient(to right, #d17575, #a93d3d);
                }

                .bg-orange {
                    background: linear-gradient(to right, #ecb071, #fa8103);
                }

                .bg-black {
                    background: linear-gradient(to right, #9be8e6, #16ccec);
                }

                .bg-green {
                    background: linear-gradient(to right, #a3e4a6, #06c00e);
                }

                .bg-yellow {
                    background: linear-gradient(to right, #db916f, #d36331);
                }
            }

            .suggestion-bk {
                margin: 10px;
                border-radius: 10px;
                font-size: 15px;
                padding: 16px 0;
                box-shadow: 0 0.026667rem 0.053333rem rgba(0, 0, 0, 0.3);

                .item {
                    height: 32px;
                    line-height: 32px;
                    position: relative;

                    &.line::after {
                        content: "";
                        height: 100%;
                        width: 0;
                        border: 1px solid #666;
                        position: absolute;
                        right: 0;
                        top: 0;
                        -webkit-transform: scaleX(.5);
                    }
                }
            }
        }

        .login-out {
            margin: 24px 10px;
            border-radius: 10px;
        }
    }
</style>
