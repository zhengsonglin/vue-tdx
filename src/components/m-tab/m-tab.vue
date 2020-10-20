<template>
    <!--<div class="bottom-menu"></div>-->
    <van-tabbar v-model="active" route active-color="#07c160" inactive-color="#000">
        <!--<van-tabbar-item replace to="/home" icon="home-o">
                <template #icon="props">
                  <img :src="props.active ? icon.active : icon.inactive" />
                </template>
                <span>自定义</span>
              </van-tabbar-item>-->
        <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
        <van-tabbar-item icon="gift-card-o" to="/limitFree">限量免单</van-tabbar-item>
        <van-tabbar-item icon="bag-o" to="/bearBuy" v-if="loginType==='tdx'">熊抢购</van-tabbar-item>
        <van-tabbar-item icon="orders-o" to="/taskCenter">订单</van-tabbar-item>
        <van-tabbar-item icon="manager" to="/userCenter">我</van-tabbar-item>
    </van-tabbar>

</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'mTab',
        data() {
            return {
                active: 0,
                icon: {
                    active: 'https://img.yzcdn.cn/vant/user-active.png',
                    inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
                },
            }
        },
        computed: {
            ...mapState(["loginType"])
        },
        methods: {},
        created() {}
    }
</script>

<style>

</style>
