import React, { PureComponent  } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './forget.less';
import { NavBar, Icon, Toast, Button } from 'antd-mobile';
import {checkMobilePhone} from '../../utils/utils';
import { NS } from '../../models/login'

@connect(({ loading }) => ({
    isSubmiting: loading.effects[`${NS}/doResetPwd`],
}))
export default class ForgetPwd extends PureComponent  {
    constructor(props) {
        super(props);
        this.state = {
            form:{
                username:"18598271043",
                pwd:"123456",
                repwd:"123456",
                yzm:"123456",
            },
            validCode:{
                btnText:"获取验证码",
                isDisabled:false
            },
        }
        this.timer = null;
    }

    UNSAFE_componentWillMount(){
        //console.log("componentWillMount")
    }
    componentDidMount() {
        //console.log("componentDidMount")
    }

    componentWillUnmount(){
        clearInterval(this.timer); //清除js定时器
    }

    render(){
        let {form: {username, pwd, repwd, yzm}, validCode:{btnText, isDisabled} } = this.state
        let {history, isSubmiting} = this.props
        console.log(isSubmiting)
        return (
            <div className={`${styles['page-register']} h100 bg-fff`}>
                <div className={styles['header-wrap']}>
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left" />}
                        onLeftClick={() => history.goBack()}

                        >找回密码</NavBar>
                </div>
                <div className={styles.content}>
                    <div className={styles['register-form']}>
                        <div className={styles['login-input']}>
                            <input type="text"  placeholder="请输入账号" value={username} onChange={(event)=>this.handChangeInput(event, 'username')} />
                        </div>
                        <div className={styles['login-input']}>
                            <input type="text" placeholder="请输入验证码" maxLength="6"  value={yzm} onChange={(event)=>this.handChangeInput(event, 'yzm')} />
                            <div className={styles['reg-get-code']}>
                                <Button className="btn-custom-style" activeClassName="btn-custom-active-style" size="small" disabled={isDisabled} onClick={this.sendCode}>{btnText}</Button>
                            </div>
                        </div>
                        <div className={styles['login-input']}>
                            <input type="password"  placeholder="请输入新密码" value={pwd} onChange={(event)=>this.handChangeInput(event, 'pwd')} />
                        </div>
                        <div className={styles['login-input']}>
                            <input type="password"  placeholder="请确认密码" value={repwd} onChange={(event)=>this.handChangeInput(event, 'repwd')} />
                        </div>
                        <div className={`${styles['btn-grop']} c-fff text-c`} >
                            <Button className="btn-custom-style" activeClassName="btn-custom-active-style" disabled={isSubmiting} loading={isSubmiting}
                                onClick={()=>(!isSubmiting && this.handResetPwd())}>{isSubmiting?'提交中...':'提交密码'}</Button>
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

    //找回密码
    handResetPwd = ()=>{
        let {form, form: {username, pwd, repwd, yzm } } = this.state
        let { dispatch, history } = this.props

        if(!checkMobilePhone(username)){
            Toast.info('请输入正确手机号', 1);
        }else if(yzm===""){
            Toast.info('验证码不能为空', 1);
        }else if(pwd.length<6){
            Toast.info('密码长度必须是六位以上', 1);
        }else if(pwd !== repwd){
            Toast.info('两次密码输入不相同', 1);
        }else{
            let copyForm = Object.assign({}, form);
            delete copyForm.repwd

            dispatch({
                type: `${NS}/doResetPwd`,
                payload: copyForm,
                callback: ({error}) => {
                    //console.log({error})
                    if (error.errno === '200') {
                        Toast.success('重置成功', 0.8, ()=>{
                            //dispatch(routerRedux.push("/login"))
                            history.push("/login")
                        });
                    }else { //如果是404等错误，这里的弹层会覆盖request.js中的弹层
                        Toast.fail(error.usermsg, 1);
                    }
                },
            })

        }
    }
}
