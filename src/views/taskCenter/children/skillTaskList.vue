<template>
    <div id="skillTaskList">
        <div class="mui-card hint">
            <div class="helps relative w100 text-c" v-show="showHint">
                注：原价-优惠价=返还金
                <span class="inline-block absolute" @click.stop="showHint = false">X</span>
            </div>
        </div>

        <div class="task-center-order">
            <van-pull-refresh v-model="refreshing" style="min-height: 100vh;" @refresh="onRefresh">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <van-cell v-for="(item, index) in list" :key="index" class="order-item bg-fff">
                        <div class="order-item-top c-fff">
                            <div class="task-top-left-box fl ">
                                <div class="task-top-tb text-c inline-block">{{item.FHttp || "淘宝"}}</div>
                                <div class="task-top-seller">{{item.shop_ww || "无※※※※点"}}</div>
                            </div>
                            <div class="task-top-right-box fr">任务状态：{{getTaskStatus(item.status)}}</div>
                        </div>
                        <div class="order-item-mid w100 over-hidden border-box">
                            <div class="task-mid-left-box fl">
                                <div class="left-box-img w100">
                                    <img :src="(item.img == '' ? item.sipping_url : item.img)" width="100%"
                                         height="100%" v-lazy="(item.img == '' ? item.sipping_url : item.img)">
                                </div>
                            </div>
                            <div class="task-mid-right-box fr border-box">
                                <div class="task-right-info"> {{item.title}}</div>
                                <div class="user-account">
                                    <span class="red">账号：{{item.FWang || "zold845517008"}}</span>
                                </div>
                                <div>
                                    <p class="row-price-1 flex">
                                        <span class="flex-1">优惠价:<span class="red">{{item.current_price}}</span></span>
                                        <span class="flex-1">返利:<span class="red">{{toDecimal2(item.reality_price - item.current_price)}}</span></span>
                                    </p>
                                    <p class="row-price-2">
                                        <span>原价:<span class="red">{{item.reality_price}}</span></span>
                                    </p>
                                </div>
                                <div class="task-right-ordernum">订单编号：{{parseAttribute(item.FOrderNumber, "(未填写)")}}</div>
                            </div>
                        </div>
                        <div class="order-item-bot over-hidden">
                            <div class="over-hidden f12">
                                <div class="fl text-l">
                                    申请时间：<span class="time">{{item.create_time}}</span>
                                </div>
                                <div class="fr text-r">
                                   完成时间：<span class="time">{{item.finish_time !== 0?item.finish_time:"(未完成)"}}</span>
                                </div>
                            </div>
                            <!--<div class="AB-assets" v-if="item.FPingJiastatus != 0 && item.FPingJiastatus != 3 && item.FNewStar != '作废'">
                                <router-link class="red" :to="{path:'/customEvaluation', query:{TaskId:item.FID}}" tag="span">点击查看评价内容 （请按商家要求评价，奖励{{item.FBuyUserPrice}}元哦）</router-link>
                            </div>-->
                            <div class="if_do flex" v-if="item.status == 1">
                                <div class="if_no inline-block text-c flex-1" @click="chargeBack(item)">我要退单</div>
                                <div class="if_is inline-block text-c flex-1" @click="startTask(item)">开始任务</div>
                            </div>

                        </div>

                    </van-cell>
                </van-list>
            </van-pull-refresh>
        </div>

        <van-dialog v-model="showProductDialog" show-cancel-button width="90%" :showConfirmButton="false">
            <template #title>
                <div class="custom-title c-fff van-ellipsis">【{{productItem.FShopName}}】</div>
            </template>
            <div class="product-info">
                <div class="info-item red">店铺名: {{productItem.FShopName}}</div>
                <div class="info-item red">下单价: ￥{{toDecimal2(productItem.FGoodsNum * productItem.FUnitPrice)}}</div>
                <div class="info-item red">礼品: {{productItem.FGoodsName}}</div>
                <div class="shop-img">
                    <img :src="productItem.FShopImg" width="100%" height="100%"/>
                </div>
            </div>
        </van-dialog>
    </div>
</template>


<script>
    import utils from "@/utils/utils"

    export default {
        name: "skillTaskList",
        props: {
            activeIndex: {
                type: [String, Number],
                required: true,
            },
            baseParam: {
                type: Object,
                default: () => {
                }
            }
        },
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                refreshing: false,
                pageNo: 1,
                pageSize: 20,
                showHint: true,
                showProductDialog: false,
                productItem: {},	//商品信息
            }
        },
        computed: {
            queryForm() {
                let copyBaseParam = utils.deepCopy(this.baseParam);
                delete copyBaseParam['ABOrTraffic']

                return Object.assign({}, {pageindex: this.pageNo, pagesize: this.pageSize}, copyBaseParam)
            }
        },
        methods: {
            onLoad() {
                if (this.refreshing) {
                    this.pageNo = 1;
                    this.list = [];
                    this.refreshing = false;
                }

                this.API.getSkillTaskOrderList(this.queryForm, {showLoading: false}).then(({orderList}) => { //{error, count, orderList}
                    this.list.push(...orderList);
                    if (orderList.length < this.pageSize) {
                        this.finished = true;
                    } else {
                        this.loading = false;
                        this.pageNo++
                    }
                })

            },
            onRefresh() {
                //下拉刷新调用onRefresh方法时内部已经处理refreshing = true, 但其他方法调用onRefresh时，并没有设置refreshing为true,所以下面再设置一次(兼容默认刷新)
                this.refreshing = true;
                // 清空列表数据
                this.finished = false;

                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.onLoad();
            },
            getTaskStatus(FStatus) {
                let text = ""
                switch (FStatus) {
                    case 1:
                        text = "已领取"
                        break;
                    case 2:
                        text = "已提交"
                        break;
                    case 4:
                        text = "已完成"
                        break;
                    case 27:
                        text = "待审核"
                        break;
                    default:
                }
                return text;
            },
            //查看商品信息
            showGoodsInfo(item) {
                this.API.getTaskInfo({TaskId: item.FID}).then((data) => {
                    this.productItem = data
                    this.showProductDialog = true
                })
            },
            //上传或查看好评图片
            uploadImg(item) {
                this.$router.push({path: "/uploadScreenShot", query: {TaskId: item.FID, Status: "have"}})
            },
            parseStateName(item) {
                let statname = "";
                let {FStatus, FPingJiastatus, FNewStar} = item
                if (FStatus != 1) {
                    if (FPingJiastatus == 0) {
                        if (FStatus == 2) {
                            statname = "上传好评截图";
                        } else {
                            statname = "查看好评截图";
                        }
                    } else {
                        if (FPingJiastatus == 1) {
                            statname = "上传定制评价截图";
                        }
                        if (FPingJiastatus == 27 || (FPingJiastatus == 4 && FNewStar != "作废")) {
                            statname = "查看定制评价截图";
                        } else {
                            if (FStatus == 2) {
                                statname = "上传好评截图";
                            } else {
                                statname = "查看好评截图";
                            }
                        }
                        //else {
                        //    statname = "查看定制评价截图";
                        //}
                    }
                }
                return statname
            },
            //查看售后
            toRefundAfter(item) {//item.FID
                this.$router.push({path: "/chooseSaledType", query: {taskId: item.FID, taskType: 1}})
            },
            //申请售后
            applyAftersale(item, saleID = -1) {//item.FID
                this.$router.push({path: "/refundDetial", query: {TaskID: item.FID, SalesID: saleID, taskType: 1}})
            },
            //查看商家备注
            checkRemark(item) {//item.FID
                this.API.getBussinessTaskInfo({UserTaskId: item.FID}).then((data) => {
                    let message = ""
                    if (data.BusinessRemark != "") {
                        message = data.BusinessRemark;
                    } else {
                        message = data.Fbz == "" ? "暂无相关备注信息" : data.Fbz
                    }
                    this.$dialog.alert({
                        title: '商家备注信息',
                        message: message,
                        confirmButtonText: "知道了"
                    }).then(() => {
                        // on close
                    });
                })

            },
            //开始退单（熊抢购退单）
            handleChargeBack(id) {
                this.API.handleChargeBack({id: id, type:6}).then(({error}) => {
                    if (error.errno == 200) {
                        this.$toast("退单成功！");
                        this.onRefresh()
                    } else {
                        this.$toast("退单失败！");
                    }
                })
            },
            //我要退单
            chargeBack(item) {
                let {id, status} = item
                if (status != 1) {
                    this.$toast("该阶段不能退单");
                    return;
                }

                this.$dialog.confirm({
                    title: '提示',
                    message: '确定退单？',
                }).then(() => {
                    this.handleChargeBack(id);
                });
            },
            //开始任务
            startTask(item) {
                this.$router.push({path: "/startSkillTask", query: {orderId: item.id}})
            },
        },
        watch: {
            queryForm: {
                handler(newValue, oldValue) {
                    console.log(newValue, oldValue)
                    this.onRefresh()
                },
                deep: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    #skillTaskList {
        .helps {
            height: 32px;
            line-height: 32px;
            flex-direction: row;
            box-shadow: 0 1px 2px rgba(0, 0, 0, .3);

            .help-item {
                width: 0;

                &.line::after {
                    content: "";
                    position: absolute;
                    right: 0;
                    top: 0;
                    height: 100%;
                    width: 0px;
                    border: 1px solid #ccc;
                    -webkit-transform: scaleX(.5);
                }
            }

        }

        .mui-card {
            .helps {
                background: rgba(225, 225, 225, 0.8);
                font-size: 14px;
                color: #fd3c3c;

                span {
                    height: 100%;
                    right: 16px;
                    top: 0;
                }
            }
        }

        .task-center-order {
            .order-item {
                margin-bottom: 16px;
                padding: 0;
                line-height: initial;
                .order-item-top {
                    height: 32px;
                    line-height: 32px;
                    padding: 0 6px;
                    background: #cdc0bf;
                    font-size: 14px;

                    .task-top-left-box {
                        > div {
                            display: inline-block;

                            &.task-top-tb {
                                background-color: orange;
                                font-size: 12px;
                                width: 32px;
                                height: 24px;
                                line-height: 24px;
                            }

                            &.task-top-seller {
                                margin-left: 10px;
                            }
                        }

                    }
                }

                .order-item-mid {
                    font-size: 13px;
                    padding: 8px 8px 0;

                    .task-mid-left-box {
                        width: 40%;

                        .left-box-img {
                            height: 128px;

                            img {
                                object-fit: cover;
                            }
                        }
                    }

                    .task-mid-right-box {
                        width: 60%;
                        padding-left: 10px;
                        > div {

                            &.task-right-well {
                                .w40 {
                                    width: 40%;
                                }

                                > div {
                                    padding: 5px 0;

                                    &.task-right-goodpic, &.task-right-goods {
                                        color: #3b8df3;
                                        display: inline-block;
                                    }
                                }

                            }
                        }
                    }
                }

                .order-item-bot {
                    padding: 6px 8px 8px;
                    font-size: 13px;

                    > div {
                        p {
                            line-height: 26px;
                        }
                    }

                    .if_do {
                        color: #3b8df3;
                        height: 24px;
                        line-height: 24px;
                        margin-top: 10px;
                    }
                }
            }
        }

        .van-dialog {
            .custom-title {
                background: linear-gradient(to right, #f0785d, #e35e40);
                padding: 10px 6px;
                margin-top: -24px;
            }

            .product-info {
                width: 90%;
                margin: 20px auto;
                line-height: 30px;
                font-size: 18px;

                .shop-img {
                    > img {
                        object-fit: contain;
                        max-height: 300px;
                    }
                }
            }
        }
    }
</style>
