// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
// import '@/plugins/flexible'
import '@/plugins/rem'
import MintUI from 'mint-ui'
import store from '@/store'
import FastClick from 'fastclick'
import Cookies from 'js-cookie'
import {common} from '@/utils/common'
import '@/utils/filters'
import request from './utils/request';
import './utils/mock';
import './utils/validate';
Vue.prototype.$http = request;
Vue.prototype.$common = common

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

Vue.use(MintUI)

router.beforeEach((to, from, next) => {
  // 页面刷新时，重新赋值token、userid
  if (Cookies.get('userid')) {  
    store.commit('SET_USER_INFO', {
      token: Cookies.get('token'),
      userid: Cookies.get('userid'),
    }); 
  }  
  next();
});

router.afterEach((to, from, next) => {
  // window.scrollTo(0, 0);
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
