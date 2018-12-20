<style scoped>
.df{
  display: flex;
}
.df1{
  flex: 1;
}
.detail-name{
  margin-bottom: 40px;
  text-align: left;
  margin-left:20px;
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
  align-items: center;
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
.disc{
  width: 20px;
  height: 20px;
  background: #eee;
  border-radius: 50%;
  margin:0 10px;
}
.disc-show{
  background: #33c9d4;
}
.item-right{
  color: #33c9d4;
}
.num-control{
  width: 60px;
  justify-content: space-around;
  align-items: center;
}
.total{
  width: 100%;
  height: 40px;
  background: #fff;
  border-top:1px solid #eee;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
<template>
  <div class="detail">
    <div @click="toGoods" class="detail-name"> ← 返回到商品列表</div>
    <ul class="list">
      <li class="item df" v-for="(v,k) in car" :key="k">
        <div @click="checkProductor(k)" :class="{'disc-show':v.checked}" class="disc"></div>
        <img class="item-cover" :src="v.cover" alt="">
        <div class="title df df1">
          <h4>{{v.name}} <span style="font-size:12px;color:#999;">{{v.price}}元</span></h4>
          <div class="item-right">
            <div class="df num-control">
              <div @click="reduceNum(k)" style="margin-bottom:2px">-</div>
              <div>{{v.num}}</div>
              <div @click="addNum(k)">+</div>
            </div>
            <div @click="removeProdutor(k)">删除</div>
          </div>
        </div>
      </li>
    </ul>
    <div class="total">
      总计：{{money}}元
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
  data () {
    return {
      
    }
  },
  computed:{
    ...mapState({
      'car': state=>state.car.list
    }),
    ...mapGetters([
      'checkedList',
      'money'
    ])
  },
  created(){
    document.title = '购物车'
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  },
  methods:{
    ...mapActions([
      'rmProdutor'
    ]),
    checkProductor(k){
      this.$store.dispatch('checkProductor', k)
      //console.log(this.checkedList)
    },
    removeProdutor(k){
      this.rmProdutor(k)
    },
    addNum(k){
      this.$store.dispatch('addNum', k)
    },
    reduceNum(k){
      this.$store.dispatch('reduceNum', k)
    },
    toGoods(){
      this.$router.push('/')
    }
  }
}
</script>

