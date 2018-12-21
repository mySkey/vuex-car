# vue的 vuex 中央仓库，集中管理全局数据（如购物车，音频——全局应该只有一个音频）

### 为什么要用vuex？
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

* 小项目没必要使用vuex来做状态管理，引入它得到的收益与成本不成正比

通过路由， 使用全局变量 global， 本地存储，及服务端存储就可以解决一般的问题

* 而在多个页面需要状态时，通过路由的话会非常混乱，尤其是状态特别多的场景，这个时候有必要使用vuex了

如购物车，全局音频，用户信息、权限······

* 单向数据流指只能从一个方向来修改状态。下图是单向数据流的极简示意：

<center><img src="http://img.22family.com/blog/artile/flow.png" /></center>

* vuex的核心是：state,getter,mutations,actions,modules

### state  类似vue中的data，暂存数据

* 直接访问

```javascript
this.$store.state.money 
```

* 通过...mapState([]) 引入后在vue组件中使用

```javascript
computed:{
  ...mapState({
    'car': state=>state.car.list
  })
}
```

### getter 类似vue中的computed

getter可以看成是store的计算属性，getter的值会根据他的依赖被缓存起来，当其依赖发生变化的时候其值才会被重新计算

* 直接访问

```javascript
$store.getters.money //这是计算属性，可以放到template中，{{ $store.getters.money }}
```

* 通过...mapGetters([]) 引入后在vue组件中使用

```javascript
computed:{
  ...mapGetters([
    'checkedList',
    'money'
  ])
}
```

### mutations  同步方法

定义了对State中数据的修改操作。

* 组件使用State中的数据的时候并不能直接对数据进行修改操作，需要调用Mutation定义的操作来实现对数据的修改
>
* store实例的commit属性来进行一个对Store的state中的数据的操作（如增加、减少等）：store.commit('addNewBook', this.form)

```javascript
let list = [
  {
    id: 10086,
    name: '牙刷',
    price: 10,
    num: 2
  }
]
this.$store.commit('SAVECAR', list)
```

* 也可以在vue中引入Mutation方法，然后直接调用方法

```javascript
data(){
  return{
    list: [
      {
        id: 10086,
        name: '牙刷',
        price: 10,
        num: 2
      }
    ]
  }
},
methods:{
  ...mapMutations([
    'SAVECAR'
  ]),
  addCar(obj){
    list.push(obj)
    this.SAVECAR(list)
  }
}
```
>
### actions    异步方法，类似vue中的methods。

* 处理异步在组件中调用Action中的方法用的不是提交commit的方法，而是使用“分发”：通过 store.dispatch 方法触发：

```javascript
let list = [
  {
    id: 10086,
    name: '牙刷',
    price: 10,
    num: 2
  }
]
this.$store.dispatch('addCar', v)
```

* 也可以在vue中引入Action方法，然后直接调用方法

```javascript
methods:{
  ...mapActions([
    'addCar'
  ]),
  add(v){
    this.addCar(v)
    this.$router.push('/detail')
  }
}
```

* 可将actions中的方法变成Promise

```javascript
actions:{
  addCar({ commit, state }, produtor){
    return new Promise((resolve,reject)=>{
      const list = [].concat(state.list)
      list.push(produtor)
      setTimeout(() => {
        commit('SAVECAR', list)
        resolve()
      }, 1000)
    })
  }
}
```

### modules    嵌套模块

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）

* /store/store.js

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import car from './modules/car.js'
Vue.use(Vuex)


const store = new Vuex.Store({
  //Vuex对象的状态，即其所拥有的数据
  //引用后使用 import store from '@/store/store.js'; computed里面store.state.books
  state:{
    
  },
  //getter可以看成是store的计算属性，getter的值会根据他的依赖被缓存起来，当其依赖发生变化的时候其值才会被重新计算
  //Getter 会暴露为 store.getters 对象，通过属性的形式访问这些值： store.getters.doneBooks
  getters: {
    
  },
  //定义了对State中数据的修改操作。组件使用State中的数据的时候并不能直接对数据进行修改操作，需要调用Mutation定义的操作来实现对数据的修改
  //store实例的commit属性来进行一个对Store的state中的数据的操作（如增加、减少等）：store.commit('addNewBook', this.form)
  mutations:{
    
  },
  //处理异步在组件中调用Action中的方法用的不是提交commit的方法，而是使用“分发”：通过 store.dispatch 方法触发：
  //if (store.state.books.length === 0) {store.dispatch('fetchData')}
  actions:{
    
  },
  //嵌套模块
  modules:{
    car
  }
})

export default store;
```
* /store/modules/car.js

```javascript
let getStorage = (key)=>{
  return JSON.parse(localStorage.getItem(key))
}
let setStorage = (key, value)=>{
  localStorage.setItem(key, JSON.stringify(value))
}
export default{
  state:{
    list: getStorage('car') || []
  },
  getters:{
    checkedList(state){
      return state.list.filter(v=>v.checked)
    },
    money(state){
      let money = 0;
      state.list.forEach(v=>{
        if(v.checked) money+=(v.price*v.num)
      })
      return money;
    }
  },
  mutations: {
    SAVECAR(state, list){
      state.list = list
      setStorage('car',list)
    }
  },
  actions:{
    addCar({ commit, state, dispatch }, productor){
      let list = [].concat(state.list)
      productor.checked = true
      if(list.length==0){
        productor.num = 1
        list.push(productor)
        commit('SAVECAR', list)
      }else{
        let some = -1;
        list.forEach((v,k)=>{
          if(v.id == productor.id) some = k 
        })
        if(some>=0){
          //list[some].num++
          dispatch('addNum', some)
        }else{
          productor.num = 1
          list.push(productor)
        }
        commit('SAVECAR', list)
      }
    },
    addNum({ commit, state }, k){
      const list = [].concat(state.list)
      list[k].num++
      commit('SAVECAR', list)
    },
    reduceNum({ commit, state }, k){
      const list = [].concat(state.list)
      list[k].num--
      commit('SAVECAR', list)
    },
    rmProdutor({ commit, state }, k){
      const list = [].concat(state.list)
      list.splice(k,1)
      commit('SAVECAR', list)
    },
    checkProductor({ commit,state }, k){
      const list = [].concat(state.list)
      list[k].checked = !list[k].checked
      commit('SAVECAR', list)
    },
    checkAll(){
      const list = [].concat(state.list)
      for (let v of list) {
        v.checked = true;
      }
      commit('SAVECAR', list)
    },
    cancelAll({ commit,state }){
      const list = [].concat(state.list)
      for(let v of list){
        v.checked = false;
      }
      commit('SAVECAR', list)
    }
  }
}
```
