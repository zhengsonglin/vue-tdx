<template>
	<div class="about">
		<div id="nav">
			<router-link to="/home">点击跳转到Home</router-link>
			|
		</div>
		<h1>This is an about page</h1>
		<div>
			<p>button</p>
			<van-button type="primary">主要按钮</van-button>
			<van-button type="info">信息按钮</van-button>
			<van-button type="default">默认按钮</van-button>
			<van-button type="warning">警告按钮</van-button>
			<van-button type="danger">危险按钮</van-button>
		</div>
		<div>
			<p>icon</p>
			<van-icon name="chat-o" />
			<van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />

			<van-icon name="chat-o" dot />
			<van-icon name="chat-o" badge="99+" />

			<van-icon name="chat-o" color="#1989fa" />
			<van-icon name="chat-o" color="#07c160" />
			<van-icon name="chat-o" size="40" />
			<van-icon name="chat-o" size="3rem" />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { Button, Icon } from 'vant';

//namespace用来区分vuex中的module
//const someModule = namespace('path/to/module')

@Component({
	name: 'About',
	components: {
		[Button.name]: Button,
		[Icon.name]: Icon
	},
	created() {
		
	}
})
export default class About extends Vue {
	@State('foo') stateFoo: any;
	@State(state => state.bar) stateBar: any;
	@Getter('gfoo') getterFoo: any;
	@Action('setAcFoo') actionFoo: any;
	@Mutation('setMuFoo') mutationFoo : any;
	//@someModule.Getter('foo') moduleGetterFoo;

	// If the argument is omitted, use the property name
	// for each state/getter/action/mutation type
	@State foo: any;
	@Getter bar: any;
	@Action setAcBaz: any;
	@Mutation setQux: any;
	
	mounted() {
		this.stateFoo; // -> store.state.foo
		this.stateBar; // -> store.state.bar
		this.getterFoo; // -> store.getters.foo
		this.actionFoo({ value: true }); // -> store.dispatch('foo', { value: true })
		this.mutationFoo({ value: true }); // -> store.commit('foo', { value: true })
		//this.moduleGetterFoo; // -> store.getters['path/to/module/foo']

		this.setQux({value: true})
		this.setAcBaz({value: true})
	}
}
</script>
