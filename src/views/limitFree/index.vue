<template>
    <div class="page-limit-free h100 over-auto">
        <div class="fix-header-wrap fixed w100">
            <van-search
                    v-model="searchKey"
                    show-action
                    placeholder="请输入搜索关键词"
                    background="#fd3c3c"
                    @search="onSearch"
            >
                <template #action>
                    <div @click="onSearch" class="btn-search c-fff">搜索</div>
                </template>
            </van-search>

            <van-tabs :swipe-threshold="6" title-active-color="#ee0a24" @change="categoryChange">
                <van-tab v-for="(item,index) in categoryList" :key="index" :title="item.short_name" :name="item.id"></van-tab>
            </van-tabs>
        </div>

        <section class="product-status flex">
            <div :class="['status-item', {'active': item.status===status}]" v-for="(item,index) in productStatus" :key="index" @click="changeProductStatus(item)">{{item.name}}</div>
        </section>

        <div class="task-center-product">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <van-row gutter="10" class="bg-fff" style="padding: 0 10px;">
                        <van-col span="12" v-for="(item, index) in productList" :key="index" class="product-item">
                            <div class="item-wrap">
                                <div class="picture w100"><img :src="item.img" alt="" class="w100"></div>
                                <div class="info">
                                    <div class="title van-ellipsis">{{item.title}}</div>
                                    <div class="two_icons">
                                        <span class="two_icons_first c-fff inline-block" v-if="item.is_img===1">需晒图</span>
                                        <span class="two_icons_last c-fff inline-block" v-if="item.integral>0">积分奖励{{item.integral}}</span>
                                        <span class="inline-block" v-else> &nbsp;</span>
                                    </div>
                                    <div class="p-content flex">
                                        <span class="price">￥{{item.price}}</span>
                                        <div class="content-desc flex flex-1">
                                            <div class="van-progress">
                                                <van-progress pivot-text="" color="#f50" :percentage="getPercentage(item)" />
                                            </div>
                                            <div class="word">已抢<span>{{item.order_count}}</span>共{{item.task_count}}件</div>
                                        </div>
                                    </div>
                                    <div class="btn text-c" @click="toProductDetail(item)">马上抢</div>
                                </div>
                            </div>
                        </van-col>
                    </van-row>
                   <!-- <van-cell v-for="(item, index) in productList" :key="index" class="product-item bg-fff">

                    </van-cell>-->
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "index",
        computed: {
            getParams() {
                return {
                    page_no: this.pageNo,
                    page_size: this.pageSize,
                    keywords: this.searchKey,
                    module_type: 1,
                    status: this.status,
                    type: 2,
                    is_family: null,
                    cid: this.category
                }
            },
            ...mapState(['categoryList'])
        },
        data(){
            return {
                searchKey:"",
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
            onSearch(){
                this.onRefresh()
            },
            //切换商品分类
            categoryChange(name, title){
                console.log(name, title)
                this.category = name
                this.onRefresh();
            },
            //修改商品状态
            changeProductStatus(item){
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
            getPercentage(item){
                let {order_count, task_count} = item
                return Math.round((order_count/task_count)*100)
            },
            toProductDetail(item) {
                this.$router.push({
                    path: "/singleProductList",
                    query: {
                        paId: item.pa_id
                    }
                });
            }
        },
        created() {
            //this.getProductList()
        }
    }
</script>

<style scoped lang="scss">
    .page-index {
        .van-search__action:active{
            background: transparent;
        }
        .fix-header-wrap{
            z-index: 10;
            top: 0;
        }
        .product-status{
            padding: 10px 12px;
            margin-top: 100px; /*no*/
            .status-item{
                border: 1px solid #666;
                color: #666;
                padding: 4px 10px;
                margin-right: 24px;
                border-radius: 4px;
                &.active{
                    border: 1px solid #f50;
                    color: #f50;
                }
            }
        }
        .task-center-product{
            padding-bottom: 50px; /*no*/
            .product-item {
                padding: 10px 0;
                .item-wrap{

                margin-bottom: 12px;
                .picture>img{
                    height: calc((100vw - 20px)/2);
                    background: #dcdcdc;
                }
                .info{
                    .title{
                        margin: 6px 0 3px;
                        font-weight: bold;
                    }
                    .two_icons{
                        height: 20px;
                        padding: 4px 0;
                        >span{
                            padding: 2px 8px;
                            border-radius: 3px;
                            margin-right: 10px;
                            &.two_icons_first{
                                background: linear-gradient(-90deg,#ff0c46,#ff797d);
                            }
                            &.two_icons_last{
                                background: linear-gradient(90deg,#769dff,#316ded);
                            }
                        }
                    }
                    .p-content{
                        align-items: center;
                        margin-top: 6px;
                        .price{
                            font-size: 13px;
                            color: #e35b17;
                            text-decoration: line-through;
                        }
                        .content-desc{
                            flex-direction: column;
                            color: #999;
                            margin: 0 .8rem 0 .26667rem;
                        }
                    }
                    .btn{
                        font-size: 12px;
                        margin: 8px 0;
                        padding: 3px 0;
                        color: #f50;
                        border: 1px solid #f50;
                        border-radius: 4px;
                        box-shadow: 0 3px 2px 0 rgba(255,201,169,.43);
                    }
                }
            }
            }
        }
    }
</style>
