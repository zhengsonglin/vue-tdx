import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
//import styles from './register.less';
import { Button, Toast } from 'antd-mobile';

@connect(({ loading }) => ({
	loading: loading
}))
export default class Order extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <div>order</div>;
	}
}
