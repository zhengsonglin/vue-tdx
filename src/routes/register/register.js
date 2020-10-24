import React, { PureComponent  } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import styles from './register.less';
import { Button, Toast } from 'antd-mobile';
import {checkMobilePhone} from '../../utils/utils';
import { NS } from '../../models/login'

@connect(({ loading }) => ({
    isLoading: loading.effects[`${NS}/doRegister`],
}))
export default class Register extends PureComponent  {
    constructor(props) {
        super(props);
        this.state = {      //存储一些实时更新的数据，属性修改后render会重新渲染
            form:{
                username:"18598271043",
                pwd:"",
                repwd:"",
                yzm:"",
                code:""
            },
            validCode:{
                btnText:"获取验证码",
                isDisabled:false
            },
        }
        this.timer = null;
    }

    componentWillUnmount(){
        clearInterval(this.timer); //清除js定时器
    }

    render(){
        const { form:{username, yzm, pwd, repwd, code}, validCode:{isDisabled, btnText}} = this.state;
        let { isLoading } = this.props

        return (
            <div className={`${styles['page-register']} h100`}>
                <div className={`${styles.header} c-fff text-c`}>
                    <p>注册</p>
                </div>
                <div className={styles.content}>
                    <div className={styles['register-form']}>
                        <div className={styles['login-input']}>
                            <input type="text" className={styles['input-height']} placeholder="请输入账号" value={username} onChange={(event)=>this.handChangeInput(event, 'username')} />
                        </div>
                        <div className={styles['login-input']}>
                            <input type="digit"  className={styles['input-height']}  placeholder="请输入验证码" maxLength="6" value={yzm} onChange={(event)=>this.handChangeInput(event, 'yzm')}/>
                            <div className={styles['reg-get-code']}>
                                <Button type="warning" size="small" disabled={isDisabled} onClick={this.sendCode}>{btnText}</Button>
                            </div>
                        </div>
                        <div className={styles['login-input']}>
                            <input type="password"  className={styles['input-height']}  placeholder="请输入密码" value={pwd} onChange={(event)=>this.handChangeInput(event, 'pwd')} />
                        </div>
                        <div className={styles['login-input']}>
                            <input type="password"  className={styles['input-height']}  placeholder="再次输入登录密码" value={repwd} onChange={(event)=>this.handChangeInput(event, 'repwd')} />
                        </div>
                        <div className={styles['login-input']}>
                            <input type="text"  className={styles['input-height']}  placeholder="请输入邀请码（必填）" maxLength="8" value={code} onChange={(event)=>this.handChangeInput(event, 'code')}/>
                        </div>
                        <div className={styles.other}>
                            <Link className={`${styles.register} fl`} to="/login">已有账号</Link>
                             {/*<span className={`${styles.register} fl`} onClick={this.handleClickToLogin}>已有账号</span>
                            <span className="forget fr" >忘记密码</span> */}

                        </div>
                        <div className={`${styles['btn-grop']} c-fff text-c`} >
                            <Button className="btn-custom-style" activeClassName="btn-custom-active-style" disabled={isLoading} loading={isLoading}
                                onClick={()=>(!isLoading && this.handRegister())}>{isLoading?'提交中...':'注册'}</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    //返回登录页
    handleClickToLogin = ()=>{
        this.props.dispatch(routerRedux.push("/login"));
        this.props.history.push("/login")
    }

    //绑定input对应属性值，使用箭头函数来解决this问题
    handChangeInput = (event, propName)=>{
        let data = Object.assign({}, this.state.form, { [propName]: event.target.value })
        this.setState({form: data});
    }

    //发送验证码
    sendCode = ()=>{

        let data = Object.assign({}, this.state.validCode, { isDisabled: true })
        this.setState({validCode: data}, ()=>{
            Toast.loading('请稍等', 1, () => {
                //Toast.info('马上发送验证码', 1);
                let nums = 60;

                this.setState({validCode: Object.assign({}, this.state.validCode, { btnText: nums + "秒后重新获取" })})
				this.timer = setInterval(()=>{
					nums--;
					if (nums > 0) {
                        this.setState({validCode: Object.assign({}, this.state.validCode, { btnText: nums + "秒后重新获取" })})
		            } else {
		                clearInterval(this.timer); //清除js定时器
                        this.setState({
                            validCode: {
                                btnText:"获取验证码",
                                isDisabled:false
                            }
                        })
		            }
				},1000)
            });
        })
    }

    //注册
    handRegister = ()=>{
        let {form, form: {username, pwd, repwd, yzm, code} } = this.state
        let { dispatch, history } = this.props

        if(!checkMobilePhone(username)){
            Toast.info('请输入正确手机号', 1);
        }else if(yzm===""){
            Toast.info('验证码不能为空', 1);
        }else if(pwd.length<6){
            Toast.info('密码长度必须是六位以上', 1);
        }else if(pwd !== repwd){
            Toast.info('两次密码输入不相同', 1);
        }else if(code===""){
            Toast.info('邀请码不能为空', 1);
        }else{
            Toast.loading('请稍等', 1)
            let copyForm = Object.assign({}, form);
            delete copyForm.repwd

            dispatch({
                type: 'login/doRegister',
                payload: copyForm,
                callback: ({error}) => {
                    Toast.hide()
                    if (error.errno === '200') {
                        Toast.success('注册成功', 0.8, ()=>{
                            //dispatch(routerRedux.push("/login"))
                            history.push("/login")
                        });
                    } else { //如果是404等错误，这里的弹层会覆盖request.js中的弹层
                        Toast.fail(error.usermsg, 1);
                    }
                },
            })

        }
    }
}

