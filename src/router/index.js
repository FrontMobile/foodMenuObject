import Vue from 'vue'
import Router from 'vue-router'
import FoodMenu from '@/components/FoodMenu'
import Test from '@/components/Test'
import WeLike from '../components/WeLike'
import ItemDetail from '../components/ItemDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/menu',
      name: 'FoodMenu',
      component: FoodMenu
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/welike',
      name: 'WeLike',
      component: WeLike
    },
    {
      path: '/detail',
      name: 'ItemDetail',
      component: ItemDetail
    }
  ]
})
