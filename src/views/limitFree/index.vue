<template>
    <!--限量免单和熊抢购 两个路由公用一个组件页面，只有大熊才有熊抢购路由(熊抢购和免单公用一个查询接口，通过查询参数module_type区分)-->
    <div class="page-limit-free h100 over-auto">
        <div class="fix-header-wrap fixed w100">
            <van-search v-model="searchKey" show-action placeholder="请输入搜索关键词" background="#fd3c3c" @search="onSearch">
                <template #action>
                    <div @click="onSearch" class="btn-search c-fff">搜索</div>
                </template>
            </van-search>

            <van-tabs :swipe-threshold="6" title-active-color="#ee0a24" @change="categoryChange">
                <van-tab v-for="(item,index) in categoryList" :key="index" :title="item.short_name"
                         :name="item.id"></van-tab>
            </van-tabs>
        </div>

        <section class="product-status flex">
            <div :class="['status-item', {'active': item.status===status}]" v-for="(item,index) in productStatus"
                 :key="index" @click="changeProductStatus(item)">{{item.name}}
            </div>
        </section>

        <div class="task-center-product">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <van-row gutter="10" class="bg-fff" style="padding: 0 10px;">
                        <van-col span="12" v-for="(item, index) in productList" :key="index" class="product-item">
                            <div class="item-wrap">
                                <div class="picture w100"><img :src="item.img" alt="" class="w100"></div>
                                <div class="info">
                                    <div class="title van-ellipsis bold">{{item.title}}</div>
                                    <!--限量免单-->
                                    <template v-if="module_type===1">
                                        <div class="two_icons">
                                            <span class="two_icons_first c-fff inline-block"
                                                  v-if="item.is_img===1">需晒图</span>
                                            <span class="two_icons_last c-fff inline-block" v-if="item.integral>0">积分奖励{{item.integral}}</span>
                                        </div>
                                        <div class="p-content flex van-row--align-center">
                                            <span class="price line-through">￥{{item.price}}</span>
                                            <div class="content-desc flex flex-1">
                                                <div class="van-progress">
                                                    <van-progress pivot-text="" color="#f50"
                                                                  :percentage="getPercentage(item)"/>
                                                </div>
                                                <div class="word">已抢<span>{{item.order_count}}</span>共{{item.task_count}}件
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <!--熊抢购-->
                                    <template v-if="module_type===2">
                                        <div class="row-content-price flex van-row--align-center">
                                            <span class="price line-through">￥{{item.price}}</span>
                                            <div class="flex-right">
                                                <span class="c-fff inline-block span-1">返利</span>
                                                <span class="span-2">￥{{toDecimal2(item.price - item.current_price)}}</span>
                                            </div>
                                        </div>
                                        <div class="row-content-desc flex van-row--justify-space-between van-row--align-center">
                                            <span class="c-fff">最低价
                                                <i>{{item.current_price}}</i>元
                                            </span>
                                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFQjJCMDI0RjBGRkExMUVBODczQUM4NTlDOTZCNTZBMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFQjJCMDI1MDBGRkExMUVBODczQUM4NTlDOTZCNTZBMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVCMkIwMjREMEZGQTExRUE4NzNBQzg1OUM5NkI1NkExIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVCMkIwMjRFMEZGQTExRUE4NzNBQzg1OUM5NkI1NkExIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+7hv6RQAAA6BJREFUeNrEl2lsTVsUx3/3ltLWVDOlMVV4xmgiiCAR8xBi/GAInob4IAgxRoiIMcJ7RaSJRIiIKURiKCHGxFRjDaXmUjXX2JZrLes251ZvOSS9XcnK3WfvdfZ/r+m/z/Ug4psUHi4/U0THicZRPHJXdKPock9iTo7HD7pPtBuhkSOivb1+T0MFqtJVdKrXH95Qy1hvMeb0VxLnpYSkaGCPB6o2gIhKzlzlWGg9oODcX0qp4KBynoTt0KIv5H2BTWPh4g7omADdp8O3r7BrBhz732yr1JND1ody1SBMtvzwEp5chdeP/xC4epyB/rAoA50nwrX90GGMP05hUKMxTE6G2DZQplzw3R9egB3TIP1MYd+kj32FZktHwPzrUCnGng8tE89zpPvmFrT7KnM3DsNNac0H5+DFPfM4rgsMXgFRVcQmF1Z2tkP8FlilfHXJ50B49wyepsLMsxAe6QCGCe9kyOHWdIf3Lwq/32kCDF1t40u7IWm4i+KKjYdBcuKzWyDtuOVbQbOzYMMQAc4zu2epNtZi+1kzbzv71WrmIsea05FJYvwP1GkFiX1g/2LoMRM2/ws9ZzuetxliGkw2BMxXqOGinXzf4NxWyP0MNZtYAWlxLJYiqtcWWvaTXKZb6N5nOe8lS4Q2j3c096OzFlHRBbAWgxaTAimg9nL/hbamuc64Jt4MhltHZfMvAXfPKbi811Hd54/7WCVLbrG14t2SJ1Ctkc31nge1m8Psi4XtJ+wuOtQq4VGQ88EFsIpWrvbs60f2fHwdXNnrrPeaA5HR/rX1ctg7EqGGVvW5nwruFRj6X1KmyjBpB28p61Wlyp6zoN0oAzv6H3zOdmxTdhqLKdnoel5AGrRefD6XwP0WWMXqSym7ILouxLQ0jawcnGbziyhe3osKsMl+7jLHysfaPioXtsGnNwV5N16K69V9ocooZy5BuLxseesKZb62I5y1txkuqlpB+y/yt5aEJ3mljVMPCdhDG+tlMHCpUWK+Xfppo0YlHK2JfLr9wdkpv/E4rLTcNPWd58t7hIFu2VgrcnkHyfFoqFjL5vQWykyTVjoJTboazeqNFV1HUrXQodcT611eEg3aw/BEI4KfyL1IWfLYIhEo7zJtj9SDLoHzi0Xz5VZiWgjTNTWvtZWe3pAb67x5HGz7IoFL7NMnBMBpJYB72+v/WxFqSVJgbdTkEIIeEF3l1T9QMtAvOyFi7hQTmBawfpLMUDIWzLzvAgwAR7gnISyU8Z4AAAAASUVORK5CYII="
                                                 alt="">
                                        </div>
                                    </template>
                                    <div class="btn text-c" @click="toProductDetail(item)">马上抢</div>
                                </div>
                            </div>
                        </van-col>
                    </van-row>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "index",
        computed: {
            getParams() {
                return {
                    page_no: this.pageNo,
                    page_size: this.pageSize,
                    keywords: this.searchKey,
                    module_type: this.module_type,
                    status: this.status,
                    type: 2,
                    is_family: null,
                    cid: this.category
                }
            },
            ...mapState(['categoryList'])
        },
        data() {
            return {
                module_type: null,
                searchKey: "",
                productStatus: [
                    {name: "进行中", status: 1},
                    {name: "全部", status: 0},
                    {name: "明日预告", status: 2},
                ],
                productList: [],
                pageNo: 1,
                pageSize: 20,
                category: 0,
                status: 1,	//1进行中，0全部，2明日预告
                loading: false,
                finished: false,
                refreshing: false,
            }
        },
        methods: {
            onSearch() {
                this.onRefresh()
            },
            //切换商品分类
            categoryChange(name, title) {
                console.log(name, title)
                this.category = name
                this.onRefresh();
            },
            //修改商品状态
            changeProductStatus(item) {
                this.status = item.status
                this.onRefresh();
            },
            //初始化首次加载
            onLoad() {
                if (this.refreshing) {
                    this.pageNo = 1;
                    this.productList = [];
                    this.refreshing = false;
                }
                this.getProductList()
            },
            //下拉刷新
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
            //查询单个类别下商品列表
            getProductList() {
                this.API.getProductList(this.getParams, {showLoading: false}).then(({data}) => {
                    //this.productList = data
                    data.forEach(({task_count, order_count}, index) => {
                        //item.task_count - item.order_count}
                        data[index].widthPercent = this.percent((task_count - order_count) / task_count, 3)
                        data[index].textPercent = this.percent(order_count / task_count, 0)
                    })
                    this.productList.push(...data);
                    if (data.length < this.pageSize) {
                        this.finished = true;
                    } else {
                        this.loading = false;
                        this.pageNo++
                    }
                })
            },
            //进度条计算, 已抢/总计
            getPercentage(item) {
                let {order_count, task_count} = item
                return Math.round((order_count / task_count) * 100)
            },
            toProductDetail(item) {
                if (this.module_type === 1) {
                    this.$router.push({
                        path: "/singleProductList",
                        query: {
                            paId: item.pa_id
                        }
                    });
                } else if (this.module_type === 2) {
                    this.$router.push({
                        path: "/productDetail",
                        query: {
                            tId: item.t_id
                        }
                    });
                }
            }
        },
        created() {
            let name = this.$route.name
            this.module_type = (name === "bearBuy" ? 2 : 1)
        },
        beforeRouteEnter(to, from, next) {
            //console.log(this, 'beforeRouteUpdate'); //当前组件实例
            //console.log(to, '组件独享守卫beforeRouteUpdate第一个参数');
            //console.log(from, '组件独享守beforeRouteUpdate卫第二个参数');
            //console.log(next, '组件独享守beforeRouteUpdate卫第三个参数');

            next(vm => {
                //因为当钩子执行前，组件实例还没被创建
                // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
                vm.module_type = (to.name === "bearBuy" ? 2 : 1)//当前组件的实例
                if (from.name === "bearBuy" || from.name === "limitFree") {
                    vm.status = 1   //路由切换后恢复到初始的状态，只查询进行中的商品
                    vm.onRefresh()
                }
            });
        }
    }
</script>

<style scoped lang="scss">
    .page-index {
        .van-search__action:active {
            background: transparent;
        }

        .fix-header-wrap {
            z-index: 10;
            top: 0;
        }

        .product-status {
            padding: 10px 12px;
            margin-top: 100px; /*no*/
            .status-item {
                border: 1px solid #666;
                color: #666;
                padding: 4px 10px;
                margin-right: 24px;
                border-radius: 4px;

                &.active {
                    border: 1px solid #f50;
                    color: #f50;
                }
            }
        }

        .task-center-product {
            padding-bottom: 50px; /*no*/
            .product-item {
                padding: 10px 0;

                .item-wrap {

                    margin-bottom: 12px;

                    .picture > img {
                        height: calc((100vw - 20px) / 2);
                        background: #dcdcdc;
                    }

                    .info {
                        .title {
                            margin: 6px 0 3px;
                        }

                        .two_icons {
                            height: 20px;
                            padding: 4px 0;

                            > span {
                                padding: 2px 8px;
                                border-radius: 3px;
                                margin-right: 10px;

                                &.two_icons_first {
                                    background: linear-gradient(-90deg, #ff0c46, #ff797d);
                                }

                                &.two_icons_last {
                                    background: linear-gradient(90deg, #769dff, #316ded);
                                }
                            }
                        }

                        .p-content {
                            margin-top: 6px;

                            .price {
                                font-size: 13px;
                                color: #e35b17;
                            }

                            .content-desc {
                                flex-direction: column;
                                color: #999;
                                margin: 0 30px 0 12px;
                            }
                        }

                        .row-content-price {
                            margin: 8px 0;
                            color: #ff464f;

                            .price {
                                font-size: 16px;
                            }

                            .flex-right {
                                border: 1px solid #ff464f;
                                margin-left: 12px;

                                .span-1 {
                                    background: #ff464f;
                                    padding: 1px 4px;
                                }

                                .span-2 {
                                    padding: 1px 8px;
                                }
                            }
                        }

                        .row-content-desc {
                            margin: 8px 0 10px;

                            > span {
                                background: #ff464f;
                                border-radius: 0 16px 16px 0;
                                padding: 2px 6px;

                                i {
                                    font-size: 16px;
                                    font: inherit;
                                }
                            }

                            > img {
                                width: 20px;
                            }
                        }

                        .btn {
                            margin: 8px 0;
                            padding: 3px 0;
                            color: #f50;
                            border: 1px solid #f50;
                            border-radius: 4px;
                            box-shadow: 0 3px 2px 0 rgba(255, 201, 169, .43);
                        }
                    }
                }
            }
        }
    }
</style>
