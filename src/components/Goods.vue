<style scoped>
.df{
  display: flex;
}
.df1{
  flex: 1;
}
.mycar{
  text-align: right;
  padding-right: 20px;
  margin-bottom: 40px;
}
.list{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.list .item{
  width: 300px;
  height: 60px;
  border: 1px solid #b2b2b2;
  border-radius: 6px;
  margin-bottom: 25px;
}
.item-cover{
  width:60px;
  height:100%;
  border-radius: 6px 0 0 6px;
}
.title{
  justify-content: space-between;
  align-items: center;
}
.item-right{
  color: #33c9d4;
}
</style>
<template>
  <div class="hello">
    <div @click="toCar" class="mycar">我的购物车</div>
    <ul class="list">
      <li class="item df" v-for="(v,k) in goods" :key="k">
        <img class="item-cover" :src="v.cover" alt="">
        <div class="title df df1">
          <h4>{{v.name}}
            <span style="font-size:12px;color:#999;">{{v.price}}元</span>
          </h4>
          <div class="item-right">
            <div @click="add(v)">加入购物车</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      goods: [],
      con:{
        pages: 1,
        limit: 8
      }
    }
  },
  computed:{
    ...mapState({
      'car': state=>state.car.list
    })
  },
  created(){
    document.title = '商品列表页'
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    this.getList()
  },
  methods:{
    ...mapActions([
      'addCar'
    ]),
    getList(){
      ajax.get('https://cnodejs.org/api/v1/topics', this.con).then(res=>{
        res.data.forEach(v=>{
          this.goods.push({ id: v.id, price: v.reply_count, cover: v.author.avatar_url, name: v.author.loginname})
        })
      })
    },
    add(v){
      this.$store.dispatch('addCar', v)
      this.$router.push('/detail')
    },
    toCar(){
      this.$router.push('/detail')
    }
  }
}
</script>
