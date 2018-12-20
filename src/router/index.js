import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/Goods'
import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
  ]
})
