<template>
    <div class="page-index financeCenter bg-fff h100 over-auto">
        <div class="header-wrap">
            <van-nav-bar
                    title="资金明细"
                    left-text=""
                    right-text=""
                    left-arrow
                    fixed
                    z-index = "10"
                    class="header"
                    @click-left="onClickLeft"
            >
                <template #right>
                    <van-icon name="replay" size="18" @click="refresh"/>
                </template>
            </van-nav-bar>
        </div>
        <div class="content">

            <div class="refund-account text-c bg-fff flex f14">
                <div class="flex-1"><p>总金额</p><p class="bold">¥{{AccountInfo.income}}</p></div>
                <div class="flex-1 mid"><p>已提现</p><p class="bold">¥{{AccountInfo.withdraw}}</p></div>
                <div class="flex-1"><p>余额</p><p class="bold">¥{{AccountInfo.balance}}</p></div>
            </div>

            <div class="filter-condition text-c bg-fff f14">
                <van-row>
                    <van-col span="6">资金类型</van-col>
                    <van-col span="6" class="bold" @click="showTypePicker=true">{{curQueryType.text}}<van-icon name="arrow-down" /></van-col>
                    <van-col span="6" v-if="curQueryType.type==4">资金状态</van-col>
                    <van-col span="6" class="bold" @click="showStatusPicker=true" v-if="curQueryType.type==4">{{curQueryStatus.text}}<van-icon name="arrow-down" /></van-col>
                </van-row>
            </div>
            <div class="refund-record">

                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                >
                    <van-cell v-for="(item, index) in list" :key="index">
                        <div class="record-item f12 flex">
                            <div class="info-l"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMjMwMEE5REUwRjYxMUU5QjgxREZEQjZDMjUyNzkyRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMjMwMEE5RUUwRjYxMUU5QjgxREZEQjZDMjUyNzkyRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkYyMzAwQTlCRTBGNjExRTlCODFERkRCNkMyNTI3OTJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkYyMzAwQTlDRTBGNjExRTlCODFERkRCNkMyNTI3OTJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+m/jjfwAABYdJREFUeNq8WX1MVWUYf865535xhaFGjgRcoBjZ+hJaucaEyrKZWoiGxlrlAr19rLkabozR3Gr0ly38iLlspSErrJUJ2pI+llRAa66lkC2BiHCAwL1wP8695/S8h/cgynnPx73Qs/0Gu/ec5/29z/s87/NxubFNORCD8Ig8RAEiF5GNWIzw0O/HEX2ILkQ7ogXRhpCsLsRZJJiG8CK2IdItrtWLOIrYh/jbiiXMyEKq+E9ERQzkgL5TQXXsozpnheBmxAXEToQD4hcH1UV0bomHoIA4gGhA3ACzL0TnMbqGYJVgAuJTRDnMvZTTtRJYVtL6rB6xTv+gXGC/72Hg0zKBvzENuGQ0iAuDWAyBHBgHefAfkPouQeS3VpAudRqRXEfXLEJEjAjWItYbOtIjJeAsfdXY4YYHwF9WYMaS6+na5XpHTJy2zIw28cxxkC4b3xahhlorx03WLmERXEh3YEpk/ygE3noR5FCQvYnTx3AjjVZ9knBI0bqoD8QSFLbsO4C/KVNjBxKIP5xEjxJjCZx3VS4qwQzERYTdcipyuoBL0r5zpdEhgHAwFoJkV0sRPWqQ7LBKjkucD46iMrAXFgHn9mi7wYQPj7kBwp8dAnl8zIp6O+W0m1iQ+GE3zbOmRLh3Dbier0aSyeb8dWwYgvsrIdLxjRWSJAKXqFWJaXLOzV5w79prmpxi7aQF4K7YD44Nz1ktTPIIwULTSXTTTnAUe2NOGc6ndoFj43YrrxQQgitNHeuqteDc8kLcec259RUQ7nnA7OO5hOBywyPCNOYqq2Zc2I0QqPFievNf9TnMHhNVpSA2f6ShjANX+R4lyEzIckIw1XDXT78GXEKiNsHvT0CkvQUCe7YrJGXfFZh4/VmInu9gBgXxX3LcJiSVRHFIr87jF6WD550m1Kpd+CiEqp8BqacL+CV4GDwP0l/nwZa5AtzVh/EKmqetOBoBv/chkIcG9AiGDQtW+5onmeTU+zABifAZ2SB1dyrkyP/uyjo2OSUFCeB4sNjY9xE+vfJbuPN+9v02OgyhD2pADk4olpsi7UqA4MEqhaDiHgx/s92Vj+Wwbvr3EYL9LIKcJxGtsYz5drTrVxC/+0Lz86kN5j8Gwu2rtAmiG5C6Uicd9hOCpJq8TTt6U/TNn1eIx/s+pjQ/SL1/QKj+7cmgKnkZ+PRluMEksN2aq3M9cMDPTwFpoJf1RCch2EErWQ0LJumnMIzayLmzWPQFQRr696oF0Q/lsSvI1A181gosKNxsJYw8TqVdoE01s+bTk+i5Vggfr5vxeeTH09eUY8LK1exN+kb0lmghBH+miTltZhAM6h9xbiG4vG8oVYvc3wPh5qO0HdgGXGoGcPOSQbg7X+cIZAD/iF6x0CbQccQR2lRf+/64T/EPchdqe7kN7Ks3Tlrz97YpggI2U7q+p9aLvRf1KnLCSVLvBtLph7WeipxtMjeiwKAgG+EXY5d38y3mqtLWZuYFTTlN9STEnIc0nzx5RDlC4wI2GTy1p8Cz94T+BT3N98RT9ayv31PnN9NTRBViaIaikUGl2CQ9xqyJFIVg7W5WgBAOlVpdHflCs56K/PTVZAdnENWmqmvM3YE3d0Dkl29Zj7w03VBa47eDrN6YHKPj0VLsQ54AbsEia0Yb7Afx60YQmz5Ugo8hddevrUWQVDYf604XSAZIXwo2rF5IKiQZh1zq6oUshwJKkyQPX1YiNdp9QflrIJ8jiq8PVtYAkwxyPkGshf9HvqRjvgmz0y3y4AbaQM+1kDUe1yJnNB8UaXdPZiWDc0CM6NxK1xDjmbCSIWMODZ7wLBALU105dOQW9whY3S3p9LMQNTA5wbcqffTdLKrL1Klwcf4MUUjb1mxabKgpxE8zQRct585AjD9D/CfAAEoyyBgmglDWAAAAAElFTkSuQmCC" alt=""></div>
                            <div class="info-r flex-1">
                                <p class="flex row-1 f14">
                                    <span>{{item.type}}{{curQueryType.type==4?" -- "+item.status:""}}</span><span>{{item.order_sn}}</span>
                                    <span class="red">{{(curQueryType.type==4||curQueryType.type==2)?"+":""}}{{item.money}}</span></p>
                                <p class="comment" v-if="curQueryType.type !=4">{{item.comment}}</p>
                                <p class="_time flex"><span>{{item.time}}</span><span class="btn-more f12" v-if="curQueryType.type ==4" @click="queryMoreInfo">查看更多</span></p>
                            </div>
                        </div>
                    </van-cell>
                </van-list>
            </div>


            <van-popup v-model="showTypePicker" position="bottom">
                <van-picker
                        show-toolbar
                        :columns="typeColumns"
                        :default-index="curQueryType.index"
                        @cancel="showTypePicker = false"
                        @confirm="onTypeConfirm"
                />
            </van-popup>

            <van-popup v-model="showStatusPicker" position="bottom">
                <van-picker
                        show-toolbar
                        :columns="statusColumns"
                        :default-index="curQueryStatus.index"
                        @cancel="showStatusPicker = false"
                        @confirm="onStatusConfirm"
                />
            </van-popup>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'financeCenter',
        data(){
            return {
                list: [],
                loading: false,
                finished: false,
                AccountInfo: {},
                curQueryType: {type:4, text:"提现记录", index:3},
                curQueryStatus: {status:0, text:"全部", index:0},
                showTypePicker: false,
                typeColumns: [
                    {type:1, text:"任务金额", index:0},
                    {type:2, text:"定制金额", index:1},
                    {type:3, text:"售后金额", index:2},
                    {type:4, text:"提现记录", index:3},
                    {type:1, text:"订单变更", index:4},
                ],
                showStatusPicker: false,
                statusColumns:[
                    {status:0, text:"全部", index:0},
                    {status:1, text:"待打款", index:1},
                    {status:3, text:"已打款", index:2},
                ]
            }
        },
        computed:{
            getQueryParam(){
                return {
                    status: this.curQueryStatus.status,
                    type: this.curQueryType.type,
                    start_time: "",
                    end_time: "",
                    page_no: 1,
                    page_size: 200,
                }
            }
        },
        methods:{
            onClickLeft(){
                this.$router.back();
            },
            //解析返款状态
            parseRefundState(item){
                let {FStatusID, RelationId} = item
                let stateText = FStatusID == 10 ? "已完成" : (RelationId == 0 ? "待打款" : "待打款（请核实卡号后联系淘大熊客服）");
                return stateText
            },
            onLoad() {
                // 异步更新数据
                this.API.getPutForwardRecord(this.getQueryParam).then(({data}) => {
                    //console.log(data)
                    this.list.push(...data);
                    this.finished = true;
                    /*if(data.length < this.pageSize) {
                        this.finished = true;
                    } else {
                        this.loading = false;

                    }*/

                })
            },
            //账户总额信息
            getFundsummary(){
                this.API.getFundsummary().then(({data})=>{
                    this.AccountInfo = data
                })
            },
            refresh(){
                this.list = []
                this.finished = false
                this.onLoad()
            },
            //资金类型筛选
            onTypeConfirm(item){
                //console.log(item)
                this.curQueryType  = {...item}
                this.showTypePicker = false
                this.refresh()
            },
            //资金状态筛选
            onStatusConfirm(item){
                this.curQueryStatus = {...item}
                this.showStatusPicker = false
                this.refresh()
            },
            queryMoreInfo(){
                this.$toast("功能暂未开发")
            }
        },
        created(){
            this.getFundsummary()
            //console.log(this.moment("2020-07-16 09:36:18").format("YYYY-MM-DD HH:mm:ss"))
            //console.log(this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
            //console.log(this.moment().format('dddd'));
        }
    }
</script>


<style scoped lang="scss">
    .page-index {
        .header {
            background: #EE580F;
            font-size: 17px;
            /deep/ .van-icon, /deep/ .van-nav-bar__title{
                color: #fff;
            }
        }
        .content {
            margin-top: 46px;/*no*/
            background: #f6f6f6;
            padding-top: 8px;
            .refund-account{
                margin: 4px 0 10px;
                padding: 10px 0;
                .mid{
                    border-left: 1px solid #e5e5e5;
                    border-right: 1px solid #e5e5e5;
                }
                .bold{
                    line-height: 24px;
                }
            }
            .filter-condition{
                padding: 15px 0;
                margin: 10px 0;

                .van-icon{
                    vertical-align: middle;
                    font-size: 15px;
                    margin: -3px 2px;
                }
            }
            .refund-record{
                /deep/ .record-item{
                    .info-l{
                        padding-right: 10px;
                        img{
                            width: 30px;
                        }
                    }
                    .info-r{
                        line-height: 24px;
                        .row-1{
                            justify-content: space-between;
                        }
                        .comment{
                            margin: 4px 0;
                            color: #666;
                        }
                        ._time{
                            color: #999;
                            align-items: center;
                            justify-content: space-between;
                            margin-top: 6px;
                            .btn-more{
                                padding: 3px 6px;
                                border-radius: 20px;
                                border: 1px solid #2577ff;/*no*/
                                color: #2577ff;
                                line-height: 12px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>