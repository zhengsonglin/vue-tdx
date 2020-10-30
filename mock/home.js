let { category, products } = require('./mockDatas/product')

module.exports = [
    // 查询商品种类
    {
        url: '/pa/cate',
        type: 'get',
        response: () => {
            return {
                "data": [...category],
                "error": {"errno": 200, "errmsg": "success", "usermsg": "success"}
            }
        }
    },

    // 查询商品列表
    {
        url: '/pa/index',
        type: 'post',
        response: config => {
            const { page_no, page_size, keywords, module_type } = config.body
            let result = [...products].filter(({title}) => title.includes(keywords))
            // 熊抢购时就把商品倒序后分页赋值
            if (module_type==2){
                let temArr = []
                result.forEach((item) => {
                    temArr.unshift(item)
                })
                result = temArr
            }
            let start = (page_no-1)*page_size

            return {
                "data": result.slice(start, start + page_size),
                "error": {"errno": 200, "errmsg": "success", "usermsg": "success"},
                "total_results": result.length
            }
        }
    },

    // 查询单个类型商品列表， 模拟时列表都只有一个，length为1，
    // 单个列表数据来源于商品列表匹配的数据, 未匹配到的属性直接写死
    {
        url: '/pa/detail',
        type: 'post',
        response: (config) => {
            const { pa_id } = config.body
            let result = products.filter((item) => pa_id == item.pa_id )
            return {
                "data": {
                    ...result[0],
                    //title: result[0].title,
                    //img: result[0].img,
                    pa_id,
                    //module_type: result[0].module_type,
                    //shop_type: result[0].shop_type,
                    shop_name: '熊熊旗舰店',
                    task_list: [{
                        area: "",
                        before_service_charge: 36,
                        current_price: 0,
                        keyword: "暖宝宝",
                        keyword2: "暖贴",
                        order_number: 1,
                        price: 50,
                        price_end: 0,
                        price_start: 0,
                        remain_count: 8,
                        service_charge: 36,
                        t_id: result[0].t_id,
                        task_count: 12,
                        task_end: "2020-10-30 00:00:00",
                        task_start: "2020-10-29 00:12:19",
                        task_type: 1
                    }]
                },
                "error": {"errno": 200, "errmsg": "success", "usermsg": "success"}
            }
        }
    },

    // 查询单个商品详情, 数据来源于商品列表匹配的数据, 未匹配到的属性直接写死
    {
        url: '/t/detail',
        type: 'post',
        response: (config) => {
            const {t_id} = config.body
            let result = products.filter((item) => t_id == item.t_id)
            return {
                "data": {
                    ...result[0],
                    task_end: "2020-10-30 00:00:00",
                    task_start: "2020-10-29 00:12:19",
                    shop_name: '熊熊旗舰店',
                    start_time: "2020-10-29 00:12:19",
                    end_time: "2020-10-30 00:00:00"
                },
                "error": {"errno": 200, "errmsg": "success", "usermsg": "success"}
            }
        }
    },

    // 领取
    {
        url: '/t/receive',
        type: 'post',
        response: {
            "data": { },
            "error":{"errno":1000,"errmsg":"writing error","usermsg":"任务已抢完"}
        }
    },

]
