import React, { PureComponent } from 'react';
import { connect } from 'dva';

@connect(({ loading }) => ({
	loading: loading //loading对象包含global, model, effects三个属性
}))
export default class TestDemo extends PureComponent {
	constructor(props) {
        super(props)
        this.state = {
            testNum: 0
        }
        this.increment =  (state, props)=>{
            return {testNum: state.testNum + 1};
        }
    }
    UNSAFE_componentWillMount(){       
        this.setState({testNum: this.state.testNum + 1}, ()=>{
            console.log("第一次",this.state.testNum)
        })    
        this.setState(this.increment, ()=>{
            console.log("第二次",this.state.testNum)
        })  
    }
    componentDidMount() {
   
        setTimeout(()=>{
            this.setState(this.increment)
            console.log("第五次",this.state.testNum)
            this.setState(this.increment)
            console.log("第六次",this.state.testNum)
        },0)

        //this.state.testNum的执行结果为 0 0 2 2 5 6
    }
    
    render() {
		let { testNum } = this.state;
		return (
            <div>
                <p>testDemo</p>
                <p>testNum的值: {testNum}</p>
            </div>
        );
	}
}