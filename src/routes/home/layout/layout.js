import React, { PureComponent  } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
//import styles from './register.less';
import {TabBar, Icon  } from 'antd-mobile';
import { renderRoutes } from 'dva-router-config';
import { Route } from 'dva/router';
import classNames from 'classnames';

@connect(({ loading }) => ({
    loading: loading,
}))
export default class Layout extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            //selectedTab: 'product',
            hidden: false,
        }
        this.tabMenuStyle = {
            barTintColor: "white",  //底部tab背景颜色
            unselectedTintColor: "#949494",  //tab未选中字体颜色
            tintColor: "rgb(7, 193, 96)",    //tab选中时字体颜色

        }
        this.tabMenu = [
            {name:"/home/product", title:"首页", key:"key1", icon: this.renderIcon(false, "fa-home"), selectedIcon: this.renderIcon(true, "fa-home")},
            {name:"/home/question", title:"问题集", key:"key2", icon: this.renderIcon(false, "fa-exclamation-circle"), selectedIcon: this.renderIcon(true, "fa-exclamation-circle")},
            {name:"/home/order", title:"订单", key:"key3", icon: this.renderIcon(false, "fa-file-text-o"), selectedIcon: this.renderIcon(true, "fa-file-text-o")},
            {name:"/home/setting", title:"我的", key:"key4", icon: this.renderIcon(false, "fa-user"), selectedIcon: this.renderIcon(true, "fa-user")}
        ]
    }
    UNSAFE_componentWillMount(){
       // console.log(this)
    }
    renderIcon = (isSelected, iconType)=>{
        let {tintColor, unselectedTintColor} = this.tabMenuStyle
        return <i className={classNames('fa fa-fw f18', iconType)} aria-hidden="true" 
            style={{color:isSelected?tintColor:unselectedTintColor}}></i>
    }
    renderContent = (routes, name)=>{
        const route = routes.find(({path})=>{
            return path.includes(name)
        })
        return (<Route {...route} />)
    }

    render(){
        let {dispatch, history, route = {}, children, location} = this.props
        console.log(this.props)
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                <TabBar
                    noRenderContent={false}
                    prerenderingSiblingsNumber={0}
                    tabBarPosition="bottom"
                    hidden={this.state.hidden}
                    {...this.tabMenuStyle}
                    >
                    {
                        this.tabMenu.map(({name, ...props})=>
                            <TabBar.Item {...props} selected={location.pathname  === name}
                                onPress={()=>{
                                    // this.setState({
                                    //     selectedTab: name,
                                    // });

                                    //dispatch(routerRedux.push(`${name}`));
                                    history.push(`${name}`)
                                }}>
                                {
                                    //renderRoutes(route.routes)
                                    //this.renderContent(route.routes, name)
                                    children

                                }
                            </TabBar.Item>
                        )
                    }

                </TabBar>
            </div>
        )
    }
}
