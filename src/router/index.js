import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@views/demo/index'
import DemoList from '@views/demo/demoList'
import ListInfinite from '@views/demo/listInfinite'   // 列表无限加载
import ListPullDown from '@views/demo/listPullDown'   // 列表下拉刷新无限加载
import ListTab from '@views/demo/listTab'   // 列表下拉刷新无限加载
import DemoForm from '@views/demo/form'   // 表单
// import HelloWorld from '@cmp/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Demo',
      component: Demo,
      meta: { keepAlive: false }
    },
    {
      path: '/demo/list',
      name: 'DemoList',
      component: DemoList,
      meta: { keepAlive: false }
    },
    {
      path: '/list/infinite',
      name: 'ListInfinite',
      component: ListInfinite,
      meta: { keepAlive: false }
    },
    {
      path: '/list/tab',
      name: 'ListTab',
      component: ListTab,
      meta: { keepAlive: false }
    },
    {
      path: '/demo/form',
      name: 'DemoForm',
      component: DemoForm,
      meta: { keepAlive: false }
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ]
})
