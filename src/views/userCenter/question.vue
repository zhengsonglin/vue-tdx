<template>
    <div class="page-question w100 h100 over-auto">
        <div class="header-wrap">
            <van-nav-bar
                    title="问题集"
                    left-text=""
                    right-text=""
                    left-arrow
                    fixed
                    z-index="10"
                    class="header"
                    @click-left="onClickLeft"
            >
            </van-nav-bar>
        </div>
        <p class="notice bg-fff bold">注意事项</p>
        <div class="row-o">
            <ul :class="['notice-item over-hidden', {'showAll':isShowAll}] ">

                <li>
                    1、下单禁止使用
                    <span>淘宝客</span>、<span>拍立淘</span>、<span>淘金币</span>、<span>红包</span>、

                    <span>集分宝</span>、<span>花呗</span>、<span>信用卡</span>、<span>代付</span>； 如用以上
                    方式下单,产生的费用将由会员自行承担,拒不承担的,平台有权冻结账号并停止返款.
                </li>
                <li>
                    2、只能使用实名认证的淘宝号下单，抢到任务尽快下单，2小时内订 单号登记超时自动退单，每天
                    <span>0点</span>停止抢单<span>0点</span>未提交的任务自动退单；
                </li>
                <li>
                    3、免单活动的内容全部咨询淘大熊客服，商品、物流问题可以咨询商 家；跟商家沟通时，不允许提及免单、好评返现等不相干问题；
                </li>
                <li>
                    4、任意两人的收货地址，不得完全相同。任意两人的收货人姓名及电 话不得相同；
                </li>
                <li>
                    5、无特殊情况不要申请退款，如有问题需退款必须经淘大熊客服同意 ；
                </li>
                <li>
                    6、打款银行支持：
                    <font style="color: red;">招商银行</font>、
                    <font style="color: red;">交通银行</font>、
                    <font style="color: red;">中国工商银行</font>、
                    <font style="color: red;">中国建设银行</font>、
                    <font style="color: red;">中国农业银行</font>、
                    <font style="color: red;">中国银行</font>；没有的亲们麻烦提前 准备哦。
                </li>
                <li>
                    7、上传图片测试一：
                    <router-link to="/pictureTest1" tag="a" class="red">点击 跳转图片测试</router-link>
                </li>
                <li>
                    8、上传图片测试二：
                    <router-link to="/pictureTest2" tag="a" class="red">点击 跳转图片测试</router-link>
                </li>
                <li>
					<span>
                                PS:请大家严格按照任务流程下单，不得互相分享宝贝链接！发

                                现分享宝贝链接者和商家反映不要求下单者，一经发现者，冻结账号！
                            </span>
                </li>

            </ul>
            <div class="show-btn w100">
                <div class="d3" @click="isShowAll= !isShowAll"><span>》</span></div>
            </div>
        </div>
        <div class="row-t">
            <ul>
                <li>
                    <h4 style="text-align:center;color: red;">
                        平台介绍
                    </h4>
                    <p>
                        平台分有两个版块，
                        <font style="color: red;"> 限量免单和熊抢购</font>限量免单：粉丝 可以自由领取免单任务做单获得相应的产品奖励及积分奖励；熊抢购：是商家的真实商品哦，属于淘
                        宝真实购买！可以使用积分抵扣，100积分抵扣1元，积分越多，抵扣越多，最高可抵扣到免费购买。

                    </p>

                </li>
                <li>
                    <h4 style="text-align:center;color: red;">
                        限量免单问题集：
                    </h4>
                    <p>

                    </p>

                </li>
                <li>
                    <h4>
                        问：每天能做几单任务？
                    </h4>
                    <p>
                        答：30个自然日内可以抢
                        <font style="color: red;">15单，每天最多可以抢1单</font>，如果抢 满系统会提示下次抢单时间
                    </p>

                </li>
                <li>
                    <h4>
                        问：怎么做单？
                    </h4>
                    <p>
                    </p>
                    <p>
                        答：1.首页领取任务
                    </p>
                    <ul>
                        <li>
                            2.下单提交订单号（先验证链接，核对任务金额下单）平台放单暂时 分两种：
                        </li>
                        <li>
                            ①有关键词的，打开淘宝搜索关键词（严格按照任务要求流程下单） ，货比三家，找到对应的商品拍下； ②有淘口令的，复制打开淘宝弹出窗口领券下单。
                        </li>
                        <li>3.收到货之后确认收货后上传好评截图(评语必写）</li>
                        <li>4.商家36小时内审核（超过36小时系统自动审核）</li>
                        <li>5.审核成功后任务金额返还到余额里</li>
                    </ul>
                    <p></p>

                </li>
                <li>
                    <h4>
                        问：需在多长时间内在平台提交订单号？？
                    </h4>
                    <p>
                        答：自领取任务后，
                        <font style="color: red;">
                            2小时内需要再平台上提交淘宝订单号

                        </font>，2小时后未提交，该任务自动撤销。
                    </p>

                </li>

                <li>
                    <h4>
                        问：找不到商品怎么办？
                    </h4>
                    <p>
                        答：筛选宝贝价格区间，仍然找不到联系淘大熊客服。
                    </p>

                </li>
                <li>
                    <h4>
                        问：找到产品链接价格不对怎么办？
                    </h4>
                    <p>
                        答：先验证链接，如链接验证失败说明找错产品，验证成功但是价格不对 ，只要不是运费原因，差额不大的可以先在淘宝付款，付款后按照任务金额提交到平台，提交后发订
                        单号和付款截图给淘大熊客服，客服可以改成实付金额，按照这个金额返款
                    </p>

                </li>
                <li>
                    <h4>
                        问：是否可以使用花呗、信用卡下单？
                    </h4>
                    <p>
                        答：下单禁止使用
                        <font style="color: red;">淘宝客</font>、
                        <font style="color: red;">村淘</font>、
                        <font style="color: red;">淘金币</font>、
                        <font style="color: red;">红包</font>、
                        <font style="color: red;">集分宝</font>，
                        <font style="color: red;">花呗</font>，
                        <font style="color: red;">信用卡</font>，
                        <font style="color: red;">代付</font>； 如用以上方式下单,产生的费 用将由会员自行承担,拒不承担的,平台有权冻结账号并停止返款
                        <font style="color: red;">
                            （其中，使用花呗、信用卡产生的手续费为 付款金额的1%）
                        </font>
                    </p>

                </li>
                <li>
                    <h4>
                        问：做任务时候能不能联系商家？
                    </h4>
                    <p>
                        答：可以在淘宝上和商家沟通，但是不能在沟通过程中涉及到做任务，礼 品样式等敏感词语！这些是不能的！
                    </p>

                </li>

                <li>
                    <h4>
                        问：用了错误的旺旺号怎么办？
                    </h4>
                    <p>
                        答：用错旺旺号有一定的可能导致商家发成真货，用错旺旺号一定要在第 一时间联系淘大熊客服微信哈，如造成商家发成真货，粉丝需寄回真货并承担来回运费。
                    </p>

                </li>
                <li>
                    <h4>
                        问：商家不发货怎么办?
                    </h4>
                    <p>
                        答：
                        <font style="color: red;">
                            联系淘大熊客服,发订单号跟物流截图

                        </font>客服联系商家催发货。
                    </p>

                </li>
                <li>
                    <h4>
                        问：下单后忘记提交订单号?
                    </h4>
                    <p>
                        答：联系淘大熊客服,发订单号和淘宝订单截图,淘大熊客服确认是否发货 ，如造成商家发成真货，粉丝需寄回真货并承担来回运费。
                    </p>

                </li>
                <li>
                    <h4>
                        问：收到的礼品有问题，怎么办？
                    </h4>
                    <p>
                        答：务必保留凭证后联系客服，不然可能无法处理，凭证包括
                        <font style="color: red;">
                            礼品照片，快递面单（快递包裹上面白色的 单子）和订单号。
                        </font>
                    </p>

                </li>

                <li>
                    <h4>
                        问：忘记评价截图了？
                    </h4>
                    <p>
                        答：我的淘宝我的评价,里面有。
                    </p>

                </li>

                <li>
                    <h4>
                        问：好评截图上传错误怎么做？
                    </h4>
                    <p>
                        答：在会员中心待审核模块可以找到对应的任务，点击查看好评截图，重 新修改为正确的截图。
                    </p>

                </li>
                <li>
                    <h4>
                        问：确认收货后评价需要注意什么？
                    </h4>
                    <p>
                        答：所有任务都需要
                        <font style="color: red;">五星好评＋文字</font>。
                    </p>

                </li>
                <li>
                    <h4>
                        问：定制评价如何处理？
                    </h4>
                    <p>
                        答：定制评价是指商家设定了文字和图片，需要特殊评价的，
                        <font style="color: red;">会有额外的1元奖励</font>，找到对应任务 ，点击下方的红字内容，里面有商家提供的文字和图片，必须评价商家规定的内容，没有按照规定的 ，
                        <font style="color: red;">作废定制评价。</font>
                    </p>

                </li>

                <li>
                    <h4>
                        问：怎么绑定银行卡？
                    </h4>
                    <p>
                        答：会员中心绑定实名的银行卡(打款银行支持:招商银行、交通银行、中 国工商银行、中国建设银行、中国农业银行、中国银行)
                    </p>

                </li>
                <li>
                    <h4>
                        问：提交好评截图后多长时间可以返款？
                    </h4>
                    <p>
                        答：提交后36小时内审核通过，如果超时，系统会自动审核通过返到余额
                    </p>
                </li>
                <li>
                    <h4>
                        问：申请提现后什么时间打款？
                    </h4>
                    <p>
                        答：一般情况下，财务每
                        <font style="color: red;">周一、四</font>打款，24小时内到账。
                        <font style="color: red;">当天提现当天不打款</font>，节假日期间打 款会另行通知。、
                    </p>
                </li>
                <li>
                    <h4>
                        问：银行卡填写错误怎么办？
                    </h4>
                    <p>
                        答：银行卡错误的不要担心哈，这边打款是必须核对您的打款信息的，只 要信息对不上就会产生退票哈，不会说漏打款的，每周二，四，六会有退票，淘大熊客服会主动联系 您更改卡号，方便再次成功打款。
                    </p>
                </li>
                <li>
                    <h4>
                        问：显示打款已完成，没有收到怎么办？
                    </h4>
                    <p>
                        答：首先
                        <font style="color: red;">核对下银行卡信息是否正确</font>，银行卡 信息包括：卡主和实名的名字是不是一致？卡行是不是支持的打款银行？银行卡有没有被银行限制！
                        需修改银行卡记得联系淘大熊客服！一切正常可以进手机银行APP查看流水，部分到账信息是没有短信 提醒的哦！
                    </p>
                </li>
                <li>
                    <h4 style="text-align:center;color: red;">
                        熊抢购问题集：
                    </h4>
                    <p>

                    </p>

                </li>
                <li>
                    <h4>
                        熊抢购是什么？
                    </h4>
                    <p>
                        熊抢购里面的是商家的真实商品，属于
                        <font style="color: red;">淘宝真实购买</font> ！不是返还全部本金 ，但是可以使用积分抵扣，
                        <font style="color: red;">100积分抵扣1元</font> ，最多抵扣到免费
                        拿真货！！！例如在充话费和购买商品时可以抵扣现金使用，比如充五十话费，有5000积分可以抵扣 五十元哦，就是免费充50元话费哦！！！在您确认收货上传好评截图后，抵扣的积分会折现和返还金
                        额一起返还到您的余额中，之后自行提现就可以。
                    </p>
                </li>
                <li>
                    <h4>
                        问：如何得到积分？积分有什么用？
                    </h4>
                    <p>
                        答：在限量免单任务中，标题上带有“积分”字样的，在得到礼品的同时 ，还会获得相应的积分，100积分=1元，积分不能直接折合为现金，但积分可以再熊抢购里用来抵扣金 额使用。
                    </p>
                </li>
                <li>
                    <h4>
                        问：对平台有些建议，想留言怎么留言？
                    </h4>
                    <p>
                        答：淘大熊平台——会员中心——下面有个意见反馈，或者联系淘大熊客 服述说登记记录
                    </p>
                </li>

            </ul>
        </div>
        <p style="height: 50px;"></p>
    </div>
</template>

<script>
    export default {
        name: "question",
        data() {
            return {
                isShowAll: false
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            },
        }
    }
</script>

<style lang="scss" scoped>
    .page-question {
        .header {
            background: #EE580F;
            font-size: 17px;

            /deep/ .van-icon, /deep/ .van-nav-bar__title {
                color: #fff;
            }
        }

        p.notice {
            margin-top: 48px;
            font-size: 16px;
            padding: 10px 0 6px 10px;
        }

        .row-o {
            margin: 10px;
            position: relative;

            .notice-item {
                font-size: 14px;
                line-height: 22px;
                list-style: none;
                height: 206px;

                &.showAll {
                    height: auto;
                }

                > li {
                    padding: 10px;
                    margin: 10px 0;
                    background: #fff;
                }

                span {
                    color: #fd3c3c;
                }
            }

            .show-btn {
                height: 100px;
                cursor: pointer;
                position: absolute;
                bottom: 0;
                left: 0;
                background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));

                .d3 {
                    width: 100%;
                    height: 25px;
                    font-size: 18px;
                    position: absolute;
                    left: 0;
                    text-align: center;
                    bottom: 0px;
                    color: black;

                    > span {
                        display: inline-block;
                        transform: rotate(90deg);
                    }
                }
            }
        }

        .row-t {
            margin: 5px;

            li {
                background: #fff;
                margin: 10px;
                padding: 10px;

                h4 {
                    font-size: 16px;
                    padding: 10px 0;
                    border-bottom: 1px dashed #fd3c3c;
                }

                P {
                    font-size: 14px;
                    line-height: 22px;
                    list-style: none;
                    margin: 10px 0 0;
                }
            }
        }
    }
</style>
