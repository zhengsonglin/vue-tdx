<template>
    <div class="page-taskCenter w100 h100 over-auto" @click.stop="close">
        <div class="page-title text-c w100 c-fff fixed">
            <div class="slot-left absolute flex">
                <div class="slot-left-item relative h100">
                    <div class="shadow absolute h100"></div>
                    <span class="iconfont right-first icon-rili relative" @click.stop="onRiLiClick"></span>
                    <transition name="slideDown">
                        <div class="left-menu-wrap absolute over-hidden bold bg-fff" v-show="leftDateShow">
                            <p @click="changeTime('today')" :class="{active:DatgeType=='today'}">今日订单</p>
                            <p @click="changeTime('week')" :class="{active:DatgeType=='week'}">一周以内</p>
                            <p @click="changeTime('month')" :class="{active:DatgeType=='month'}">一月以内</p>
                            <p @click="changeTime('all')" :class="{active:DatgeType=='all'}">全部订单</p>
                        </div>
                    </transition>
                </div>
            </div>
            <div class="slot-center van-ellipsis">
                <!--任务中心-->
                <van-dropdown-menu>
                    <van-dropdown-item v-model="orderType" :options="option" @change="onDropDownMenuChange"/>
                </van-dropdown-menu>
            </div>
            <div class="slot-right absolute flex">
                <div class="slot-right-item relative h100">
                    <div class="shadow absolute h100"></div>
                    <span class="mui-icon iconfont mui-pull-right right-second icon-qita3 relative"
                          @click.stop="onMenuClick"></span>
                    <transition name="slideDown">
                        <div class="right-menu-wrap absolute over-hidden bold bg-fff" v-show="rightMenuShow"
                             @click.stop="rightMenuShow=false">
                            <router-link to="home" tag="p">首页</router-link>
                            <router-link to="taskCenter" tag="p">任务列表</router-link>
                            <router-link to="financeCenter" tag="p">我的财务</router-link>
                            <router-link to="userCenter" tag="p">个人中心</router-link>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
        <div class="define-tab fixed flex bg-fff w100">
            <div :class="['tab-item', {'active':index==activeIndex}]" v-for="(item, index) in tabs" :key="index"
                 @click="onNavClick(item, index)">
                <span>{{item.name}}</span>
                <!--
                <transition name="van-slide-down" v-if="item.children && item.children.length">
                    <div class="sub-menu bg-fff w100 relative" v-show="visible">
                        <p v-for="(sItem, sIndex) in item.children" :key="sIndex"
                           :class="['sub-tab-item', {'active':sItem.isActive}]"
                           @click.stop="onChildNavClick(sItem, item, index)">{{sItem.name}}</p>
                    </div>
                </transition>
                -->
            </div>
        </div>

        <div class="content">
            <task-list ref="taskList" :activeIndex="activeIndex" :baseParam="queryBaseParam"
                       v-if="orderType=='1'"></task-list>

            <skill-task-list ref="skillTaskList" :activeIndex="activeIndex" :baseParam="queryBaseParam"
                             v-if="orderType=='2'"></skill-task-list>
        </div>


    </div>
</template>

<script>
    import taskList from "./children/taskList";
    import skillTaskList from './children/skillTaskList'
    import { mapState, mapMutations } from 'vuex'

    export default {
        name: "userCenter",
        components: {
            taskList, skillTaskList
        },
        data() {
            return {
                option: [
                    {text: '限量免单订单', value: '1'},	//淘抢购订单
                    {text: '熊抢购订单', value: '2'},	//熊抢购订单
                ],
                tabs: [
                    {state: "0", name: "全部", num: 4},
                    {state: "2", name: "已提交", num: 1},
                    {state: "3", name: "待审核", num: 2},
                    {state: "4", name: "已完成", num: 3},
                    {state: "1", name: "已领取", num: 5},
                    {
                        state: "5", name: "售后", num: 0,
                        /*children: [{state: "B", name: "商家发起", num: 11, isActive: false}, {
                            state: "C",
                            name: "用户发起",
                            num: 12,
                            isActive: false
                        }]*/
                    },
                ],
                activeIndex: 0,	//当前nav, 从0开始
                visible: false,
                rightMenuShow: false,
                leftDateShow: false,
                DatgeType: 'all',	//订单时间，all全部，today今天，week一周内，moth一月内
                ABOrTraffic: 'AB',
            }
        },
        computed: {
            getActiveStatus() {
                if (this.activeIndex) {
                    return this.tabs[this.activeIndex].state
                } else {
                    return this.tabs[this.activeIndex].state
                    //return this.tabs[this.activeIndex].children.filter((item)=>item.isActive)[0].state
                }
            },
            queryBaseParam() {
                return {
                    DatgeType: this.DatgeType,
                    ABOrTraffic: this.ABOrTraffic,
                    //Status: this.getActiveStatus || 'have',
                    status: this.getActiveStatus || 0,	//0全部
                    order_type: this.orderType,	//1限量免单，2熊抢购
                    task_end: "",	//2020-06-27
                    task_start: ""	//2020-06-01
                }
            },
            orderType:{
                get(){
                    return this.lastOrderType
                },
                set(value){
                    this.setLastOrderType(value)
                }
            },
            ...mapState(["lastOrderType"])
        },
        methods: {
            close() {
                this.leftDateShow = false;
                this.rightMenuShow = false;
            },
            //导航左侧日历
            onRiLiClick() {
                if (this.rightMenuShow) {
                    this.rightMenuShow = false;
                    return;
                }
                this.leftDateShow = !this.leftDateShow;
            },
            //导航右侧菜单
            onMenuClick() {
                if (this.leftDateShow) {
                    this.leftDateShow = false;
                    return;
                }
                this.rightMenuShow = !this.rightMenuShow;
            },
            //按时间筛选订单
            changeTime(type) {
                this.DatgeType = type;
                this.leftDateShow = false
            },
            //切换订单类型(0淘抢购，1熊抢购)
            onDropDownMenuChange(value) {
                //console.log(value)
                this.setLastOrderType(value)
            },
            //tab导航切换
            onNavClick({state, name}, index) {
                console.log(state, name, index)

                let children = this.tabs[this.activeIndex].children
                if (children && children.length) {
                    children.forEach((obj) => {
                        obj.isActive = false
                    })
                }
                this.activeIndex = index
                this.visible = false

            },
            //tab子菜单切换
            onChildNavClick({state, name}, pItem, index) {
                console.log(state, name, index)
                this.activeIndex = index;
                pItem.children.forEach((obj) => {
                    obj.isActive = (obj.num == index)
                })
                this.visible = !this.visible
            },
            ...mapMutations({
                setLastOrderType: "setLastOrderType"
            })
        },
        created() {
            let {activeIndex = 0, orderType} = this.$route.params
            this.activeIndex = activeIndex
            if(orderType){
                this.orderType = orderType
            }

        }
    }
</script>

<style lang="scss" scoped>

    .slideDown-enter, .slideDown-leave-to {
        /*height: 0;
        transform: translateX(80px);*/
        transform: translateY(-144px);
    }

    .slideDown-enter-to, .slideDown-leave {
        /*top: 48px;
        bottom: auto;
        height: 144px;
        transform: translateX(0px);*/
        transform: translateY(0px);

    }

    .slideDown-enter-active, .slideDown-leave-active {
        transition: all 0.4s ease;
    }

    .page-taskCenter {
        .page-title {
            top: 0;
            left: 0;
            height: 48px;
            line-height: 48px;
            background-color: #fd3c3c;
            font-size: 17px;
            z-index: 100;

            .slot-left, .slot-right {
                top: 0;
                bottom: 0;
                align-items: center;
                font-size: 14px;
                cursor: pointer;

                .iconfont {
                    font-size: 20px;
                    z-index: 12;
                }
            }

            .slot-left {
                left: 0;

                .slot-left-item {
                    padding: 0 16px;

                    .shadow {
                        width: 80px;
                        top: 0;
                        left: 0;
                        z-index: 10;
                        background-color: #fd3c3c;
                    }

                    .left-menu-wrap {
                        left: 0;
                        top: 48px;
                        color: #333;
                        width: 80px;
                        line-height: 36px;

                        p.active {
                            color: blueviolet;
                        }
                    }
                }
            }

            .slot-right {
                right: 0;

                .slot-right-item {
                    padding: 0 16px;

                    .shadow {
                        width: 80px;
                        top: 0;
                        right: 0;
                        z-index: 10;
                        background-color: #fd3c3c;
                    }

                    .right-menu-wrap {
                        right: 0;
                        top: 48px;
                        color: #333;
                        width: 80px;
                        line-height: 36px;
                    }
                }
            }

            .slot-center {
                max-width: 60%;
                margin: 0 auto;
                font-size: 16px;
                height: 100%;
                /deep/ .van-dropdown-menu {
                    background: inherit;
                    color: inherit;
                    height: 100%;
                    .van-dropdown-menu__bar {
                        background: inherit;
                        height: 100%;
                        .van-dropdown-menu__title, .van-dropdown-menu__item {
                            color: inherit;
                            background: inherit;
                        }
                    }

                    /deep/ .van-dropdown-menu__item {
                        height: 100%;
                        .van-dropdown-menu__title {
                            color: inherit;
                        }
                    }
                }
            }
        }

        .define-tab {
            z-index: 10;
            left: 0;
            top: 48px;
            flex-direction: row;
            justify-content: space-around;
            height: 48px;
            line-height: 48px;

            .tab-item {
                flex: 1;
                text-align: center;
                font-size: 14px;

                &.active {
                    border-bottom: 2px solid red;

                    > span {
                        color: #fd3c3c;
                        font-weight: 900;
                    }
                }
            }

            .sub-menu {
                z-index: -2;
                top: 3px;

                .sub-tab-item {
                    &.active {
                        color: blueviolet;
                    }
                }
            }
        }

        .content {
            margin-top: 96px;
            padding: 14px 8px 50px;

        }

    }
</style>
