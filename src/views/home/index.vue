<template>
    <div class="page-index h100 over-auto" id="page-index">
        <van-search v-model="searchKey" shape="round" :background="searchBg" placeholder="请输入搜索关键词" @search="onSearch"
                    class="search-com w100"/>
        <my-swiper class="mySwiper" height="200"></my-swiper>

        <van-row class="activity-type">
            <van-col span="12">
                <!--<div class="row bg-fff text-c" @click="test">
                    <img src="../../assets/img/nav-1.png" />
                </div>-->
                <router-link to="sortProduct" tag="div" class="row bg-fff text-c"><img
                        src="../../assets/img/nav-1.png"/></router-link>
            </van-col>
            <van-col span="12">
                <div class="row bg-fff text-c" @click="changeSkillTaskList">
                    <img src="../../assets/img/nav-2.png"/>
                </div>
                <!--<router-link to="skillTaskList" tag="div" class="row bg-fff text-c"><img src="../../assets/img/nav-2.png" /></router-link>-->
            </van-col>

        </van-row>
        <advertising-vertical :datas="advertisingList" v-if="pageType==1">
            <template v-slot:title>
                <p class="adv-title">商城头条
                    <van-icon name="bullhorn-o"/>
                </p>
            </template>
        </advertising-vertical>
        <div class="scroll-tips bold border-box bg-fff" v-if="pageType==2">熊抢购非免单任务，返款金额=原价-优惠价+积分抵扣金额</div>

        <div class="content">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <!--淘抢购-->
                    <template v-if="pageType==1">
                        <van-cell v-for="(item, index) in list" :key="index" class="product-item">
                            <van-row class="bg-fff product-item-row" @click.stop="toProductDetail(item)">
                                <van-col span="8">
                                    <div class="imgShow">
                                        <img :src="item.img" class="product-pic w100 h100" v-lazy="item.img"/>
                                    </div>
                                </van-col>
                                <van-col span="16">
                                    <div class="product-info">
                                        <div class="p-title van-ellipsis">{{item.title}}</div>
                                        <div class="p-tag"><span class="inline-block" v-show="item.is_img==1">需晒图</span>
                                        </div>
                                        <div class="p-price over-auto"><span>垫付:</span><span class="price">￥{{item.price}}</span>
                                            <van-button type="danger" size="small" class="buy-btn fr c-fff"
                                                        @click.stop="toProductDetail(item)">马上抢
                                            </van-button>
                                        </div>
                                        <div class="progress">
                                            <div class="bar_box inline-block h100"
                                                 :style="{width:percent(item.order_count/item.task_count, 0)}"></div>
                                            <div class="bar_txt w100 h100 c-fff">剩余{{item.task_count -
                                                item.order_count}}件/共{{item.task_count}}件{{percent(item.order_count/item.task_count,
                                                0)}}
                                            </div>
                                        </div>
                                    </div>
                                </van-col>
                            </van-row>
                        </van-cell>
                    </template>

                    <!--熊抢购-->
                    <template v-if="pageType==2">
                        <van-cell v-for="(item, index) in skillTaskList" :key="index"
                                  class="product-item skillTask-item">
                            <van-row class="bg-fff product-item-row">
                                <van-col span="8">
                                    <div class="imgShow">
                                        <img :src="item.img" class="product-pic w100 h100"/>
                                    </div>
                                </van-col>
                                <van-col span="16">
                                    <div class="product-info flex">
                                        <div class="ski-name">
                                            <p class="ski-title van-ellipsis">{{item.title}}</p>
                                            <div class="desc inline-block" v-if="(item.price - item.current_price) > 0">
                                                拍下后平台返还{{(item.price - item.current_price).toFixed(2)}}元
                                            </div>
                                        </div>
                                        <div class="ski-num flex">
                                            <div class="ski-num-left">
                                                <p class="preferentialPrice">优惠价：<span class="bold">￥{{item.current_price}}</span>
                                                </p>
                                                <p class="originalPrice">原价：<span
                                                        class="line-through">￥{{item.price }}</span></p>
                                            </div>
                                            <div class="ski-num-right">
                                                <van-button type="danger" size="small"
                                                            @click.stop="toProductDetail(item)">立即抢购
                                                </van-button>
                                            </div>
                                        </div>
                                    </div>
                                </van-col>
                            </van-row>
                        </van-cell>
                    </template>
                </van-list>
            </van-pull-refresh>
            <!--<router-view></router-view>-->
        </div>
        <!--子页面
        <router-view></router-view>-->

        <p style="height: 50px;"></p>
    </div>
</template>

<script>
    import MySwiper from 'components/swiper/swiper'
    import advertisingVertical from 'components/advertising/advertising-vertical'
    import { mapState, mapMutations } from 'vuex'

    export default {
        components: {
            MySwiper,
            advertisingVertical
        },
        computed: {
            ...mapState(['categoryList'])
        },
        data() {
            return {
                advertisingList: this.$store.state.advertisingList,
                list: [], //淘抢购礼品列表
                loading: false,
                finished: false,
                refreshing: false,
                pageNo: 1,
                pageSize: 30,
                searchKey: "",
                dyHeight: "40%",
                searchBg: "rgba(255, 0, 0, 0.2)", //rgba(79, 192, 141, 0.2)
                swiperHeight: "",
                pageType: 1, //1淘抢购， 2熊抢购
                skillTaskList: [], //熊抢购礼品列表
            }
        },
        methods: {
            onLoad() {
                if (this.refreshing) {
                    this.pageNo = 1;
                    this.list = [];
                    this.refreshing = false;
                }
                let base = {
                    page_no: this.pageNo,
                    page_size: this.pageSize,
                    keywords: this.searchKey,
                    type: 2,
                    is_family: null
                }
                if (this.pageType == 1) {
                    let params = Object.assign({}, base, {module_type: 1})
                    this.API.getProductList(params, {
                        showLoading: false
                    }).then(({data}) => {
                        //console.log(data)
                        this.list.push(...data);
                        if (data.length < this.pageSize) {
                            this.finished = true;
                        } else {
                            this.loading = false;
                            this.pageNo++
                        }

                    })
                }
                if (this.pageType == 2) {//熊抢购
                    let params = Object.assign({}, base, {module_type: 2})
                    this.API.getSkillTaskList(params).then(({data}) => {
                        this.skillTaskList.push(...data);
                        if (data.length < this.pageSize) {
                            this.finished = true;
                        } else {
                            this.loading = false;
                            this.pageNo++
                        }
                    })
                }

            },
            onRefresh() {

                // 清空列表数据
                this.finished = false;

                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.onLoad();
            },
            setSearchBg() {
                var wScoll = document.getElementById("page-index").scrollTop,
                    ratio = (wScoll / this.swiperHeight).toFixed(2);
                if (ratio < 0.2) {
                    ratio = 0.2
                } else if (ratio > 1) {
                    ratio = 1
                }
                this.searchBg = `rgba(255, 0, 0, ${ratio})`
            },
            onSearch() {

                this.refreshing = true
                // 清空列表数据
                this.finished = false;

                this.onLoad();
            },
            toProductDetail(item) {
                if(this.pageType == 1) {
                    this.$router.push({
                    path: "/singleProductList",
                    query: {
                        paId: item.pa_id
                    }
                });
                } else if(this.pageType == 2) {
                    this.$router.push({
                        path: "/skillTaskDetail",
                        query: {
                            tId: item.t_id
                        }
                    });
                }
            },
            changeSkillTaskList() {
                this.pageType = 2;
                this.pageNo = 1;
                this.onRefresh();
            },
            //查询所有商品分类
            getCategory() {
                if (!this.categoryList || !this.categoryList.length){
                    //查询所有商品类别
                    this.API.getCategory().then(({data, error}) => {
                        if(error.errno===200){
                            this.setCategoryList(data)
                        }
                    })
                }
            },
            ...mapMutations({
                setCategoryList: 'setCategoryList'
            })
        },
        mounted() {
            let box = document.getElementById("page-index")
            this.swiperHeight = document.getElementsByClassName("mySwiper")[0].offsetHeight

            if (box) {
                box.onscroll = this.setSearchBg
            }
            this.getCategory()
        }
    }
</script>

<style scoped lang="scss">
    .page-index {
        /deep/ .activity-type {
            margin: 10px;
        }

        .search-com {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 10;
        }

        .scroll-tips {
            font-size: 13px;
            padding-left: 10px;
            color: #0107f7;
            margin: 10px;
            padding: 6px;
            border-radius: 6px;
        }

        .content {
            .product-item {
                min-height: 120px;
                margin: 0 10px 10px;
                width: auto;
                padding: 0;
                border-radius: 6px;

                .product-item-row {
                    .imgShow {
                        margin: 6px;

                        .product-pic {
                            object-fit: cover;
                            min-height: 100px;
                            max-height: 150px;
                        }
                    }

                    .product-info {
                        .p-title {
                            font-size: 14px;
                            margin: 4px 0 5px 14px;
                        }

                        .p-tag {
                            margin: 5px 0 5px 14px;

                            span {
                                color: #ed7739;
                                background: #fde9e0;
                                padding: 2px 3px;
                            }
                        }

                        .p-price {
                            margin: 5px 0 5px 14px;

                            > span {
                                vertical-align: middle;
                                color: #8f8f94;

                                &.price {
                                    color: #fd3c3c;
                                    font-size: 16px;
                                    font-weight: 800;
                                    margin-left: 10px;
                                }
                            }

                            .buy-btn {
                                height: 24px;
                                line-height: 20px;
                                border-radius: 4px;
                                margin-right: 10px;
                            }
                        }

                        .progress {
                            width: 70%;
                            position: relative;
                            height: 14px;
                            background-color: #ecc5ba;
                            border-radius: 10px;
                            margin-left: 10px;
                            line-height: 1;

                            .bar_box {
                                background-color: #fd3c3c;
                                border-radius: 0.5rem;
                            }

                            .bar_txt {
                                position: absolute;
                                left: 0;
                                top: 0;
                                font-size: 12px;
                                text-indent: 10px;
                            }
                        }
                    }
                }

                &.skillTask-item {
                    .product-info {
                        flex-direction: column;
                        justify-content: space-between;
                        padding-left: 10px;

                        .ski-name,
                        .ski-num {
                            padding:2px 10px;

                            .desc {
                                font-size: 13px;
                                color: #848484;
                            }

                            .ski-num-left {
                                .preferentialPrice {
                                    color: #fd3c3c;

                                    span {
                                        font-size: 18px;
                                    }
                                }
                            }

                            .ski-num-right {
                            }
                        }

                        .ski-num {
                            flex-direction: row;
                            justify-content: space-between;
                            align-items: flex-end;
                        }
                    }
                }
            }

            /deep/ .van-list__finished-text {
                margin-top: -10px;
            }
        }
    }
</style>
