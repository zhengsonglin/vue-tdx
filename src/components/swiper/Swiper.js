import React from 'react';
import ReactSwipe from 'react-swipe';
import PropTypes from 'prop-types'
import classNames from 'classnames';
import styles from './index.less'
let cx = classNames.bind(styles);

const Swiper = ({defaultOptions, options, datas}) => {

    let opt = { ...defaultOptions, ...options}
    let reactSwipeEl;

    opt.callback = function(index) {
        options.callback && options.callback(index)
    }

	return (
		<div className={cx('swiper-wrap')}>
			<ReactSwipe className={classNames('carousel')} swipeOptions={opt} ref={el => (reactSwipeEl = el)}>
                {
                    datas.map((item, num)=>(<div className="carousel-item" key={num}><img src={item} width="100%" className="swiper-img h100" /></div>))
                }
			</ReactSwipe>
			<div className={cx('index-container')}>
                {
                    datas.map((item, index)=> (<span className={index === options.activeIndex ? 'selected' : ''} key={index}></span>))
                }
		
			</div>
            {/* <button onClick={() => reactSwipeEl.prev()}>上一张</button>
            <button onClick={() => reactSwipeEl.next()}>下一张</button> */}
		</div>
	);
};

//组件默认值
Swiper.defaultProps={
    name:'张三',
    defaultOptions:{
        auto: 2000,
        disableScroll: false,
    },
    datas:[]
}

Swiper.propTypes = {
    options: PropTypes.object,
    datas: PropTypes.array,
    //optionalBool: PropTypes.bool,
    //optionalFunc: PropTypes.func,
    //optionalNumber: PropTypes.number,
    //optionalString: PropTypes.string,
    //optionalSymbol: PropTypes.symbol
};

export default Swiper;

