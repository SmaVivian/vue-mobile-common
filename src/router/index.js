import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@views/demo/index'
import DemoList from '@views/demo/demoList'
import ListInfinite from '@views/demo/listInfinite'   // 列表无限加载
import ListPullDown from '@views/demo/listPullDown'   // 列表下拉刷新无限加载
import ListPullDownDetail from '@views/demo/listPullDownDetail'   // 列表详情
import ListTab from '@views/demo/listTab'   // 列表下拉刷新无限加载
import DemoForm from '@views/demo/form'   // 表单
import DemoLogin from '@views/demo/login'   // 表单
// import HelloWorld from '@cmp/HelloWorld'

Vue.use(Router)

//使用Vue.mixin的方法拦截了路由离开事件，并在该拦截方法中实现了销毁页面缓存的功能。
Vue.mixin({
  beforeRouteLeave:function(to, from, next){
    //此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
    if (from && from.meta.rank && to.meta.rank && from.meta.rank>to.meta.rank) {
      if (this.$vnode && this.$vnode.data.keepAlive) {
        if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
          if (this.$vnode.componentOptions)
          {
            var key = this.$vnode.key == null
              ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
              : this.$vnode.key;
            var cache = this.$vnode.parent.componentInstance.cache;
            var keys  = this.$vnode.parent.componentInstance.keys;
            if (cache[key]) {
              if (keys.length) {
                var index = keys.indexOf(key);
                if (index > -1) {
                  keys.splice(index, 1);
                }
              }
              delete cache[key];
            }
          }
        }
      }
      this.$destroy();
    }
    next();
  },
});

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Demo',
      component: Demo,
      meta: { keepAlive: false }
    },
    {
      path: '/demo',
      name: 'DemoList',
      component: DemoList,
      meta: { keepAlive: false, rank: 1 }
    },
    {
      path: '/list/infinite',
      name: 'ListInfinite',
      component: ListInfinite,
      meta: { keepAlive: false, rank: 2 }
    },
    // 缓存组件示例start
    {
      path: '/list/pulldown',
      name: 'ListPullDown',
      component: ListPullDown,
      meta: { keepAlive: true, rank: 2 }
    },
    {
      path: '/list/pulldown/detail',
      name: 'ListPullDownDetail',
      component: ListPullDownDetail,
      meta: { keepAlive: false, rank: 3 }
    },
    // 缓存组件示例end
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
    {
      path: '/demo/login',
      name: 'DemoLogin',
      component: DemoLogin,
      meta: { keepAlive: false }
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ]
})
