import React, { Component } from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router'
import './product.less';
import { Button, SearchBar, Flex, WingBlank, WhiteSpace, PullToRefresh } from 'antd-mobile';
import Swiper from '../../../components/swiper/Swiper';
import FastSwiper from '../../../components/fastSwiper/fastSwiper';
import Adviertisement from '../../../components/adviertisement/adviertisement';

@connect(({ loading, global }) => ({	//{ loading, global }
	loading: loading,
	advertisingList: global.advertisingList,
	banners: global.banners
}))
export default class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
			actIndex: 0,
			serchKey: '',
			refreshing: false,
			down: true,
			height: document.documentElement.clientHeight,
			products: [],
		};

	}
	onChange = (serchKey) => {
		this.setState({ serchKey });
	};
	clear = () => {
		this.setState({ serchKey: '' });
	};
	handleClick = () => {
		this.manualFocusInst.focus();
	};
	render() {
		let { actIndex, serchKey, height, products, down, refreshing } = this.state;
		let { banners, advertisingList } = this.props
		let opt = {
			auto: 2000,
			activeIndex: actIndex,
			callback: function(index) {
				this.setState({ actIndex: Number(index) });
			}.bind(this),
			imgHeight: 240
		};

		return (
			<div className="page-product">
				{/* 
					*swiper组件封装的2中不同写法，无状态组件和类组件
					<Swiper options={opt} datas={banners} /> 
				*/
					<FastSwiper datas={banners} options={opt}></FastSwiper>
				}
				

				<div className="search-wrap">
					<SearchBar value={serchKey} placeholder="Search"
						onSubmit={(value) => console.log(value, 'onSubmit')}
						onClear={(value) => console.log(value, 'onClear')}
						onFocus={() => console.log('onFocus')}
						onBlur={() => console.log('onBlur')}
						onCancel={() => console.log('onCancel')}	
						onChange={this.onChange}
					/>
				</div>

				<WingBlank size="md">
					<WhiteSpace size="md" />
						<div className="activity-type bg-fff">
							<Flex>
								<Flex.Item className="text-c">
									<Link to="/home/product"><img  src="img/nav-1.png"/></Link>
								</Flex.Item>
								<Flex.Item className="text-c">
									<Link to="/home/product"><img  src="img/nav-2.png"/></Link>
								</Flex.Item>
							</Flex>
							
						</div>
					<WhiteSpace size="md" />
				</WingBlank>

				<WingBlank size="md">
					<WhiteSpace size="md" />
						<div className="advertisement bg-fff flex align-center">
							<div className="title">商城头条<i className="fa fa-bullhorn f12 icon" aria-hidden="true"></i></div>
							<div className="flex-1">
								<Adviertisement datas={advertisingList} options={{dots:false}}></Adviertisement>
							</div>
						</div>
					<WhiteSpace size="md" />
				</WingBlank>

				<div onTouchStart={(e)=>e.preventDefault()}>
					<PullToRefresh
						damping={60}
						ref={el => this.ptr = el}
						style={{ height, overflow: 'auto'}}
						indicator={down ? {} : { deactivate: '上拉可以刷新' }}
						direction={down ? 'down' : 'up'}
						refreshing={refreshing}
						onRefresh={() => {
							this.setState({ refreshing: true });
							setTimeout(() => {
								this.setState({ refreshing: false });
							}, 1000);
						}}
					>
						{products.map(i => (
						<div key={i} style={{ textAlign: 'center', padding: 20 }}>
							{this.state.down ? 'pull down' : 'pull up'} {i}
						</div>
						))}
					</PullToRefresh>
				</div>
			</div>
		);
	}

	componentDidMount() {
		//ref={this.props.cdContainerRef}
		//const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
		console.log(this.ptr)

		setTimeout(() => this.setState({
			//height: hei,
			products: genData(),
		}), 0);
	}
}


function genData() {
	const dataArr = [];
	for (let i = 0; i < 20; i++) {
	  dataArr.push(i);
	}
	return dataArr;
}