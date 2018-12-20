<style scoped>
.df{
  display: flex;
}
.df1{
  flex: 1;
}
.detail-name{
  margin-bottom: 40px;
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
</style>
<template>
  <div class="detail">
    <div class="detail-name">
      购物车
    </div>
    <ul class="list">
      <li class="item df" v-for="(v,k) in car" :key="k">
        <div @click="checkProductor(k)" :class="{'disc-show':v.checked}" class="disc"></div>
        <img class="item-cover" :src="v.cover" alt="">
        <div class="title df df1">
          <h4>{{v.name}}</h4>
          <div class="item-right">
            <div>{{v.stock}}</div>
            <div @click="removeProdutor(k)">删除</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data () {
    return {
      
    }
  },
  computed:{
    ...mapState({
      'car': state=>state.car.list
    })
  },
  created(){
    document.title = '购物车'
  },
  methods:{
    ...mapActions([
      'rmProdutor'
    ]),
    checkProductor(k){
      this.$store.dispatch('checkProductor', k)
    },
    removeProdutor(k){
      this.rmProdutor(k)
    }
  }
}
</script>

