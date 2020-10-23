import React from 'react';
import { Carousel } from 'antd-mobile';
import PropTypes from 'prop-types';

class FastSwiper extends React.Component {
    //ES6方法设置组件默认属性值, 静态属性默认值(ES6 静态属性默认值——基于static的写法)
    static defaultProps = {
        name: "张三",
        age: 18,
        defaultOptions:{
            autoplay: true,
            infinite: true,
            dots: true,
            imgHeight: 220,
            autoplayInterval: 3000
        },
        datas: []
    }

    //ES6 组件prop-types验证
    static propTypes = {
        name: PropTypes.string.isRequired,
        options: PropTypes.object.isRequired,
    }

	constructor(props) {
		super(props);
		this.state = {
            datas: [...props.datas],
			imgHeight: props.options.imgHeight || 176
        };
	}

	render() {
        let {options, defaultOptions, datas} = this.props
        let {autoplay, infinite, autoplayInterval, dots, imgHeight} = Object.assign({}, defaultOptions, options)

        //let {imgHeight} = this.state
		return (
			
				<Carousel autoplay={autoplay} infinite={infinite} dots={dots} autoplayInterval={autoplayInterval}
					beforeChange={(from, to) => this.beforeChange(from, to)}
					afterChange={(index) => this.afterChange(index)}
				>
					{datas.map((val, num) => (
						<div key={num} style={{  width: '100%', height: imgHeight}} >
							<img src={val} alt="" style={{ width: '100%', height: '100%', verticalAlign: 'top', objectFit: 'fill' }}
								onLoad={() => {
									// fire window resize event to change height
									//window.dispatchEvent(new Event('resize'));
									//this.setState({ imgHeight: 'auto' });   //imgHeight: 'auto'
								}}
							/>
						</div>
					))}
				</Carousel>
		
		);
    }
    
    beforeChange = (from, to)=>{
        //console.log(`slide from ${from} to ${to}`)
    }
    afterChange = (index)=>{
        //console.log('slide to', index)
    }
}


/*
* ----------ES5与ES6默认属性值及属性类型校验同时存在时， ES5会覆盖ES6
//ES5方式设置组件默认属性值
FastSwiper.defaultProps = {
    name: "张三"
}


//ES5方式组件属性类型
FastSwiper.propTypes = {
    options: PropTypes.object,
    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalString: PropTypes.string,
    optionalSymbol: PropTypes.symbol
};
*/
export default FastSwiper