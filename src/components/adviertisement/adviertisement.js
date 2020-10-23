import React, {Component} from 'react';
import { Carousel } from 'antd-mobile';
import PropTypes from 'prop-types';
import './adviertisement.less'

export default class Adviertisement extends Component {
    //ES6 静态属性默认值——基于static的写法
    static defaultProps = {
        defaultOptions:{
            autoplay: true,
            infinite: true,
            dots: true,
            vertical: true,
            dragging: false,
            swiping: false,
            autoplayInterval: 3000
        },
        datas: []
    }

    //ES6 组件prop-types验证
    static propTypes = {
        options: PropTypes.object.isRequired,   //PropTypes.object.isRequired,
    }

    render() {
        let {options, defaultOptions, datas} = this.props
        let {autoplay, infinite, vertical, dots, dragging, swiping} = Object.assign({}, defaultOptions, options)

        return (
            <Carousel className="my-carousel" vertical={vertical} dots={dots} dragging={dragging} swiping={swiping} 
                autoplay={autoplay} infinite={infinite} >
                    {
                        datas.map((item, index)=> (<div className="v-item" key={index}>{item.text}</div>))
                    }
            </Carousel>
        )
    }
}
