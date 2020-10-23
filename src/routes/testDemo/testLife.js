import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ loading }) => ({
	loading: loading //loading对象包含global, model, effects三个属性
}))
export default class TestLife extends Component {
	constructor(props) {
		super(props);
		this.columns = []; //通常是一些不需要更新的数据
		this.state = {
			testNum: 0
		};
	}

	//组件是否要更新重新执行render方法，包含render下所有子组件，需要灵活使用，
	shouldComponentUpdate(nextProps, nextState) {
		console.log('shouldComponentUpdate');
		return true; //必须返回true，false;
	}
	UNSAFE_componentWillUpdate() {
		console.log('componentWillUpdate');
	}
	componentDidUpdate() {
		console.log('componentDidUpdate');
	}

	//setState是同步执行的，但是state并不一定会同步更新
	//setState的基本过程,shouldComponentUpdate > componentWillUpdate > render > componentDidUpdate
	/**
     * 当shouldComponentUpdate执行时，返回true，进行下一步，this.state没有被更新返回false，停止，更新this.state
     * 当componentWillUpdate被调用时，this.state也没有被更新直到render被调用时候，this.state才被更新。
     * 总之，直到下一次render函数调用(或者下一次shouldComponentUpdate返回false时)才能得到更新后的this.state
     * 
     * 因此获取更新后的状态可以有3种方法：1. setState callback  2. setState函数式 3. setState在setTimeout，Promise等异步中执行
     * 参考register路由页面
     */

	UNSAFE_componentWillMount() {
		this.setState({ testNum: this.state.testNum + 1 });
		console.log('第一次', this.state.testNum);
		this.setState({ testNum: this.state.testNum + 1 });
		console.log('第二次', this.state.testNum);
	}
	componentDidMount() {
		//const { dispatch } = this.props;
		console.log(this.props);
		this.setState({ testNum: this.state.testNum + 1 });
		console.log('第三次', this.state.testNum);
		this.setState({ testNum: this.state.testNum + 1 });
		console.log('第四次', this.state.testNum);

		setTimeout(() => {
			this.setState({ testNum: this.state.testNum + 1 });
			console.log('第五次', this.state.testNum);
			this.setState({ testNum: this.state.testNum + 1 });
			console.log('第六次', this.state.testNum);
		}, 0);
		//this.state.testNum的执行结果为 0 0 1 1 3 4
	}

	render() {
		let { testNum } = this.state;
		return (
            <div>
                <p>testLift生命周期</p>
                <p>testNum的值: {testNum}</p>
            </div>
        );
	}
}
