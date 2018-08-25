import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import next from '@/components/next'
import third from '@/components/third'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/next',
      name: 'next',
      component: next
    },
    {
      path: '/third',
      name: 'third',
      component: third
    }
  ]
})
