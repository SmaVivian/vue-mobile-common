<template>
  <div id="app">
    <div class="header">
      <!-- <img src="./assets/images/logo.png"> -->
    </div>
    <div class="main">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  @import './assets/css/theme.less';
  @import 'normalize.css';
  @import 'mint-ui/lib/style.css';
  @import 'flex.css';
</style>
