import React, { Component  } from 'react';
//PureComponent与Component基本相同但性能更高， 当使用了shouldComponentUpdate后不建议使用PureComponent
//import React, { PureComponent, Component  } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import styles from './login.less';
import { checkMobilePhone } from '../../utils/utils';
import { NS } from '../../models/login'
import { Toast, Button } from 'antd-mobile';

@connect(({loading, login}) => ({//{ loading,login }
    isSubmiting: loading.effects[`${NS}/doLogin`],
    ...login,   //拓展login对应的model下的state属性
}))
export default class Login extends Component  {
    constructor(props) {
        super(props);
        this.state = {      //存储一些实时更新的数据，属性修改后render会重新渲染
            form: {
                user: "18598271043",
                pwd: "zsl123456",
                platform: "2c"
            },
        }
        //console.log(props.testInfo)
    }

    render(){
        const { form:{user, pwd} } = this.state;
        const { isSubmiting } = this.props

        return (
            <div className={`h100 ${styles['page-login']}`}>
            <div className={`c-fff text-c ${styles['header']}`}>
                <p>登录</p>
            </div>
            <div className={styles.content}>
                <div className={`${styles['login-pic']} text-c`}>
                    <img src="img/logo.png" width="56%" alt="" />
                </div>
                <div className={styles['login-form']}>
                    <div className={styles['login-input']}>
                        <input type="text" placeholder="请输入账号" maxLength="11" value={user} onChange={(event)=>this.handChangeInput(event, 'user')} />
                    </div>
                    <div className={styles['login-input']}>
                        <input type="password" placeholder="请输入密码" value={pwd}  onChange={(event)=>this.handChangeInput(event, 'pwd')} />
                    </div>
                    <div className={styles.other}>
                        {/* <span className={`${styles.register} fl`} onClick={this.handleClickRegister} >注册</span>
                        <span className={`${styles.forget} fr`} onClick={this.handleClickForgetPwd} >忘记密码</span> */}
                        <Link className={`${styles.register} fl`} to="/register">注册</Link>
                        <Link className={`${styles.forget} fr`} to="/forgetPwd">忘记密码</Link>
                    </div>
                    <div className={`${styles['btn-grop']} c-fff text-c`}>
                        <Button className="btn-custom-style" activeClassName="btn-custom-active-style"
                            disabled={isSubmiting} loading={isSubmiting}  onClick={ ()=>(!isSubmiting && this.handLogin())}>{isSubmiting?'登录中...':'登录'}</Button>
                    </div>
                </div>
            </div>
        </div>
        )
    }

    //绑定input对应属性值，使用箭头函数来解决this问题
    handChangeInput = (event, propName)=>{
        let data = Object.assign({}, this.state.form, { [propName]: event.target.value })
        this.setState({form: data});
    }

    // 注册
    handleClickRegister = (params) => {
        //this.props.dispatch(routerRedux.push("/register"));
        this.props.history.push("/register")
    }

    // 忘记密码
    handleClickForgetPwd = (params) => {
        //this.props.dispatch(routerRedux.push(`/forgetPwd`));
        this.props.history.push("/forgetPwd")
    }

    handLogin = ()=>{
        let { form, form:{user,  pwd} } = this.state
        let { dispatch, history } = this.props

        if(!checkMobilePhone(user)) {
            Toast.info('请输入正确手机号', 1);
        } else if(pwd === "") {
            Toast.info('请输入密码', 1);
        } else {
            Toast.loading('请求中...', 0)
            dispatch({
                type: `${NS}/doLogin`,
                payload: form
            }).then(({error})=>{
                Toast.hide()
                if(error.errno === 200) {
                    //dispatch(routerRedux.push("home"))
                    history.push("/home")
                }
            })

        }

    }
}
