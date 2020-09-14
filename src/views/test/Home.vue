<template>
  <div class="home">
	<div id="nav">
	    <router-link to="/about">点击跳转到About</router-link>
	</div>
    <img alt="Vue logo" src="../../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
	<p>{{pageName}}</p>
	<p>{{testA}}</p>
	<p>{{age}}</p>
	<p>{{animal.name}}</p>
	<p>计算属性：{{computedTestAge}} --------------- {{computedTestHeight}}----{{ttcc}}</p>
	<p>vuex属性: {{user}}-----{{phone}}----getters:{{email}}</p>
  </div>
</template>

<script lang="ts">
import {Component, Provide, Vue, Watch, Emit } from 'vue-property-decorator'
import { State, Getter, Mutation, Action } from 'vuex-class'
import HelloWorld from '@/components/HelloWorld.vue'
@Component({
  name: 'Home',
  components: {
    HelloWorld
  },
  // 生命周期, 也可以写在下面的组件方法中，组件中的生命周期方法会覆盖当前的生命周期方法
  mounted() {
    console.log('mounted2')
  }
})
export default class Home extends Vue {
  
  // computed 计算属性
  get computedTestAge() {
    return this.age + 18
  }
  // 等价于是 computed: { computedTestHeight() {} }
  get computedTestHeight() {
    return this.age * 9
  }
  
  get ttcc() {
    console.log('computed')
    return this.age * 10
  }
  
  private get userInfo(): string {
      return this.pageName + this.testA
  }
  private set userInfo(val: string) {
      this.pageName = val
  }
  @Provide() public testA: string = 'st'
  @Provide() public msg: string = 'needWatch'
  @Provide() public inputWatch: string = ''
  @Provide() public age: number = 18
  @Provide() public animal: object = {
    name: 'dog'
  }
  
  @State((state) => state.user) public user!: string
  @State('phone') public phone!: string
  // data

  private pageName: string = 'home page'
  
  @Getter('email')
  private email!: string
  
  @Mutation('setUserEmail')
  private setUserEmail!: (email: string) => void
  
  @Action('getUserInfo')
  private getUserInfo!: (params: {token: string}) => Promise<any>
  
  // 等价于 methods: { handleClick() {} }
  public handleClick() {
    console.log(666)
  }
  
  // watch 监听
  @Watch('msg', {immediate: true, deep: true})
  public onChangeValue(newVal: string, oldVal: string) {
      this.inputWatch = newVal + ' world';
  }

  // 等价于 resetCount() { ... this.$emit('reset') }
  @Emit('reset')
  public resetCount() {
    this.age = 0
  }
  
  // 等价于 returnValue() { this.$emit('return-value', 10, e) }
  @Emit()
  public returnValue(e: any) {
    return 10
  }
  
  // 等价于 promise() { ... promise.then(value => this.$emit('promise', value)) }
  @Emit()
  public promise() {
    return new Promise((resolve) => {
      resolve(20)
    })
  }
    
  // 生命周期
  private mounted() {
    console.log('mounted')
  }
}
</script>
