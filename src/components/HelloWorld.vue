<template>
  <div class="hello">
    <div>
      {{book}}
    </div>
    <div @click="add">添加</div>
    <div @click="del">删除</div>
  </div>
</template>

<script>
import store from '@/store/store.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:{
    book(){
      return store.state.books
    }
  },
  methods:{
    add(){
      store.dispatch('onAddBook','html入门')
    },
    del(bl=true){
      store.commit('delBook',bl)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
