let {orderList, haoping} = require('./mockDatas/orders')

module.exports = [
    // 查询订单列表
    {
        url: '/o/orderlist',
        type: 'post',
        response: config => {
            const {page, page_num, status, order_type} = config.body

            let result = status == 0 ? [...orderList] : [...orderList].filter((item) => status == item.status)
            // 熊抢购时无订单
            if (order_type == 2) {
                return {
                    "orderList": [],
                    "count": 0,
                    "error": {"errno": 200, "errmsg": "success", "usermsg": "查询订单列表成功！"}
                }
            }
            let start = (page - 1) * page_num

            return {
                "orderList": result.slice(start, start + page_num),
                "error": {"errno": 200, "errmsg": "success", "usermsg": "success"},
                "count": result.length
            }
        }
    },
    // 订单好评截图
    {
        url: '/o/orderaction',
        type: 'post',
        response: config => {
            const {type} = config.body
            if (type == 3) {
                return haoping
            } else if (type == 5) {
                return {
                    "mc_comment": "拍什么发什么颜色，收藏关注点推荐，文字+晒图3张",
                    "error": {"errno": 200, "errmsg": "success", "usermsg": "查看商家备注成功！"}
                }
            }
        }
    },
]
