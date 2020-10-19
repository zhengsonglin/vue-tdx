<template>
    <!--productDetail-->
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
                <router-link to="financeCenter" tag="p">我的财务</router-link>
                <router-link to="userCenter" tag="p">个人中心</router-link>
            </div>
        </div>

        <div class="content">
            <div class="com-detail detail-title over-hidden">
                <div class="cell-row row-1">
                    <span class="productName f16">{{productInfo.title}}</span>
                </div>
                <div class="cell-row row-2"><span class="price fl">￥{{productInfo.price}}</span>
                    <div class="title-price-sur fr">剩余商品 <span class="span_Num red">{{productInfo.remain_count}}</span>份
                    </div>
                </div>
            </div>
            <div class="com-detail" v-if="parseInt(productInfo.RemoteRegionIsDeliver) == 0">
                <span class="detail-remark red">偏远地区不发货</span>
            </div>
            <!-- 活动时间介绍 -->
            <div class="com-detail detail-time">
                <p>
                    <span class="iconfont icon-clock"></span>活动时间开始
                    <span class="time-over bold f18 fr" style="color: deepskyblue">{{productInfo.task_start}}</span>
                </p>
                <p>
                    <span class="iconfont icon-clock"></span>活动时间结束
                    <span class="time-over bold red fr">{{productInfo.task_end}}</span>
                </p>
            </div>

            <!-- 活动金额介绍 -->
            <div class="com-detail detail-num">
                <span>任务金额：</span>
                <span class="num red">￥{{productInfo.price}}</span>元 | 返还金额：
                <span class="num red">￥{{productInfo.price}}</span>元
            </div>

            <!-- 保险金 -->
            <div class="com-detail detail-insu">
                <span class="iconfont icon-yinxingqia"></span>商家已存入保证金{{productInfo.price}}元平台担保返款
            </div>
            <div class="text-c">
                <p class="f18" style="color:orangered">【~~~~~建议提前1~2秒点击秒杀~~~~~】</p>
                <p class="f16">当前时间</p>
                <p class="bold f22" style="color: blue">{{curTime}}</p>
                <p>抢购结果:{{responseText}}</p>
            </div>
        </div>
        <div class="foot-bar fixed bg-fff text-c">
            <van-button size="large" block color="linear-gradient(-90deg,#fa2440,#f7697d)" class="f18" @click="submit">
                开始自动抢购
            </van-button>
        </div>

    </div>
</template>

<script>
    import MySwiper from 'components/swiper/swiper'

    export default {
        name: "productDetail",
        components: {
            MySwiper,
        },
        computed: {
            imgList() {
                let {img, sipping_url} = this.productInfo;
                return [img, sipping_url]
            },
        },
        data() {
            return {
                showMenuNav: false,
                productInfo: {},
                curTime: new Date().toLocaleString(),
                responseText: ""
            }
        },
        methods: {
            getProductDetail() {
                this.API.getProductDetail({
                    t_id: this.tId
                }).then(({data}) => {
                    this.productInfo = data
                })
            },
            submit() {
                let t1 = new Date(this.productInfo.task_start).getTime()
                let tt = setInterval(() => {
                    this.API.getTheTask({t_id: this.tId}).then(({data, error}) => {
                        if(error.errno === 200 ){
                            this.responseText = error.usermsg
                            clearInterval(tt)
                        }

                        let t2 = new Date().getTime()
                        if(t2 - t1>=2000){
                            clearInterval(tt)
                        }
                    })
                }, 0)

            },
        },
        created() {
            setInterval(()=>{
                this.curTime =  new Date().toLocaleString()
            },500)
            this.tId = this.$route.query.tId
            this.getProductDetail();
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
            padding-bottom: 70px;
            /*no*/
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

                        &.row-2 {
                            .price {
                                color: orange;
                                text-decoration: line-through;
                            }

                            .title-price-sur {
                                font-size: 10px;
                            }
                        }
                    }
                }

                .detail-remark {
                    font-size: 16px;
                }

                &.detail-time {
                    font-size: 13px;

                    > p {
                        line-height: 24px;
                    }

                    .icon-clock {
                        font-size: 18px;
                        vertical-align: middle;
                    }
                }

                &.detail-num {
                    font-size: 14px;
                }

                &.detail-insu {
                    font-size: 14px;
                    color: #4fb74f;

                    .icon-yinxingqia {
                        font-size: 18px;
                        vertical-align: middle;
                    }
                }

            }
        }

        .foot-bar {
            left: 0;
            right: 0;
            bottom: 0;
            height: 50px;
            /*no*/
            line-height: 50px;
            /*no*/
            border-top: 1px solid #ccc;
            box-shadow: 0 0 6px 1px #ccc;
        }
    }
</style>
