let {receivePay, AccountDetail} = require('./mockDatas/settings')

module.exports = [
    // 用户账户信息
    {
        url: '/u/index',
        type: 'post',
        response: {
            "data": {
                "avatar": "",
                "is_family": -1,
                "mobile": "18598271043",
                "account": "18598271043",
                "balance": 6.5,
                "integral": 0,
                "fan_num": 3,
                "verified_status": 3,
                "qq": "811",
                "amount_raised": 0,
                "order_month_num": 12,
                "order_num": {
                    "free": {
                        "received_num": 0,
                        "submitted_num": 2,
                        "pending_review_num": 1,
                        "after_sale_num": 0,
                        "completed_num": 67
                    },
                    "xqg": {
                        "received_num": 0,
                        "submitted_num": 0,
                        "pending_review_num": 0,
                        "after_sale_num": 0,
                        "completed_num": 0
                    }
                },
                "un_msg_num": 1,
                "invite_code": "14983716"
            }, "error": {"errno": 200, "errmsg": "success", "usermsg": "success"}
        }
    },

    // 用户基本信息
    {
        url: '/u/info',
        type: 'get',
        response: {
            "data": {
                "create_time": "2020-04-07",
                "avatar": "",
                "account": "18598271043",
                "mobile": "18598271043",
                "age": 25,
                "gender": "女",
                "marriage": "未婚",
                "education": "高中",
                "email": "8116915@qq.com",
                "crowd": "待业",
                "province": "山西",
                "city": "太原",
                "qq": "811"
            }, "error": {"errno": 200, "errmsg": "success", "usermsg": "success"}
        }
    },

    // 账户提现
    {
        url: '/u/withdraw',
        type: 'get',
        response: {
            "data": {
                "balance": 6.5,
                "real_name": "郑松林 ",
                "bank": "招商银行",
                "bank_card": "6214831276033468",
                "is_submit": true
            }, "error": {"errno": 200, "errmsg": "success", "usermsg": "success"}
        }
    },

    // 实名认证
    {
        url: '/u/prove',
        type: 'get',
        response: {
            "data": {
                "is_submit": false,
                "real_name": "郑松林 ",
                "ww_name": "zold811691503",
                "gender": "男",
                "age": 25,
                "prove_img": "https://taodaxiong-1259123353.cos.ap-shanghai.myqcloud.com/Documents/f7051976-5fce-4f40-a664-53b50631ad96.jpg"
            }, "error": {"errno": 200, "errmsg": "success", "usermsg": "success"}
        }
    },

    // 银行卡绑定
    {
        url: '/u/bank',
        type: 'get',
        response: {
            "data": {
                "avatar": "",
                "mobile": "18598271043",
                "account": "18598271043",
                "qq": "811",
                "real_name": "郑松林 ",
                "is_submit": false,
                "bank": "招商银行",
                "bank_card": "6214831276033468",
                "regist_province": "湖北省",
                "regist_city": "武汉市",
                "sub_branch_name": "招商银行股份有限公司武汉光谷科技支行"
            }, "error": {"errno": 200, "errmsg": "success", "usermsg": "success"}
        }
    },

    // 账户总交易明细
    {
        url: '/u/fundsummary',
        type: 'post',
        response: {
            "data": {
                "income": 7279.8,
                "withdraw": 7273.3,
                "balance": 6.5,
                "integral_total": 0,
                "integral_use": 0,
                "integral": 0
            }, "error": {"errno": 200, "errmsg": "success", "usermsg": "success"}
        }
    },

    // 定制金还款， 账户明细
    {
        url: '/u/transactiondetail',
        type: 'post',
        response: (config) => {
            const {status, type, start_time, end_time} = config.body
            if (status || type || start_time || end_time) {
                return AccountDetail
            } else {
                return receivePay
            }
        }
    }
]
