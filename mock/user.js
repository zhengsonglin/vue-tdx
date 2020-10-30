module.exports = [
    // 用户登录，只能用admin或者18598271043登录
    {
        url: '/sys/login',
        type: 'post',
        response: config => {
            const {user} = config.body
            // mock error
            if (user !== '18598271043') {
                return {
                    error: {errmsg: 'param illege', errno: 400, usermsg: '账户密码不正确，请核对后重新输入'}
                }
            }
            return {
                "data": {
                    "avatar": "",
                    "is_ab": "",
                    "prove_group": "A",
                    "account": "18598271043",
                    "mobile": "18598271043",
                    "invite_code": "14983716",
                    "platform": "2c",
                    "status": 1
                },
                "error": {"errno": 200, "errmsg": "success", "usermsg": "success"}
            }
        }
    },
]
