import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@views/demo/index'
// import HelloWorld from '@cmp/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Demo',
      component: Demo,
      meta: { keepAlive: false }
    }
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ]
})
